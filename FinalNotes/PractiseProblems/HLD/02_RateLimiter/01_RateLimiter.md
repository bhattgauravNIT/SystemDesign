**Design rate limiter**

Rate limiter is generally used to prevent our service from over burning or over used, say we have a application which
is capable of handling 10k req/sec however a situation can come in which more than 10k req/sec is coming it can be handled
via various other methods like say we do a horizontal scaling and add more nodes of server and place a load balancer in between
but consider other situations like we wish to prevent user from sending say more than 5req/user/min, may be due to any
n number of reasons like say prompting him to buy subscription or other business needs, all these situations needs a 
rate limiter which tracks req coming from the user in that specific time frame and to decide wether to allow it or not.

There can be 3 different types of rate limiter:

a) Hard limiter or throttling
b) Soft limiter or throttling
c) Elastic limiter or throttling

A hard limiter sets a hard limit than in case the req/user/min reaches a threshold allowed than all subsequent request
after that will be dismissed.

In a soft limiter or soft throttling, in case of a threshold being met, some request may be queued or request are slowed
down but not dropped.

In a elastic limiter or elastic throttling, even in case of a threshold being met, some request may be send through based on 
server availability or capacity to handle request.


So, lets say the interviewer agreed for having a hard throttling, in which once the threshold is reached then the subsequent
request will be dropped for that time frame, and once the time frame resets the user is again allowed to send request, then
the question arise that where to place this rate limiter i,e on the client side, on the server side or as a middleware.

Lets explore all the possibilities. 

**Rate limiter at client side:**

Placing a rate limiter at client side is a good idea, however it posses some problems, one there can be multiple types of
clients like say web, android, ios etc. In this situation we need to create multiple rate limiters performing the same job
which are supported by these different types of clients, moreover client can manipulate this limiter as it will be present at
client side and therefore the rate limiter will not be aligning with our business needs. So generally its not advised
to place a rate limiter at the client side.


**Rate limiter at server side**

Placing a rate limiter at server side is also a good idea, however the overall goal of the rate limiter is to limit the
number of request from a client for a time frame and at the same time also not to change the response time of the request
very drastically. So lets say after place the rate limiter the response latency to a request doubled as compared to a scenario
without a rate limiter and thus there can a situation like this by placing rate limiter at server side, moreover say
later on we horizontally scaled our application due to n number of reasons now every node of server is having its own
rate limiter and there fore some kind of synchronization between these rate limiters will now be needed because say for a 
specific user, the load balancer sends one request to node 1 and other request to node 2. Now node1's rate limiter considers
this request as first request from this user, whereas the rate limiter of node2 also considers this request as the first request
only for this user and thus the overall crux of having a rate limiter went to drain. Thus to make rate limiters
synchronized there is an overhead and thus can impact the systems performance.


**Rate limiter as a middleware**

Rate limiter as a middle ware is the perfect choice of placement for a rate limiter. Some load balancer, also allows
integration of rate limiter and thus even reducing any over head and therefore not having great impact on request to response
latency. Middleware acts a middle frame , i,e it handles it before it reaches the actual server and moreover can send
response 429 representing too many request error status code. Modern day load balancers like NGINX also support rate limiters.



So now we have decided upon the placement of our rate limiter and now question arises, what algo shall we be using 
to implement our rate limiter. A rate limiter can be implemented via various algo lets talk about them one by one.

**1) Token bucket**:

In token bucket algo there are two things one N -> the total tokens which the bucket can have, this also resembles
the total request which the user can make in a time frame, T -> it refers to the total token being consumed by the
user in that time frame , R -> refers to the refill rate of token in the bucket.

Suppose based upon the discussion with interviewer, we came across that we need say 5req/user/min.

Now N -> 5 i,e total tokens which bucket can hold is 5.
Say R-> 2 sec i,e after every 2 seconds the bucket will be refilled with tokens
T -> available tokens at t=0 is 5 i,e all possible total tokens.

Now at t=0:
N->5
R->2
T->5

Say 2 request came from user at T=0, 

N=5
R=2
T=3 as two tokens got consumed while serving 2 request, so once request came 1 token got consumed and then for another
request another token got consumed.

Now at T=2

A refill happened, so 

N=5
T=5 (T was previously 3, token refilling happened i,e N-T0 = 5-3 = 2 tokens got added to T)
R=2

Now in frame of [t=2 -> t=4) 6 request came in. 
R0 got acknowledged and T becomes 4
R1 got acknowledged and T becomes 3
R2 got acknowledged and T becomes 2
R3 got acknowledged and T becomes 1
R4 got acknowledged and T becomes 0
now when R5 came, T is 0 no more token in left and we are doing hard throttling thus R5 got dropped.

Now at T=4 again refill happened and T again became T=5

Thus token bucket algorithm works like this and allows burst i,e the user can make subsequent request it it has available
token and thus can lead to spike in traffic.


**2) Leaky bucket**

In case we don't want a burst or a spike and want something more strict than we can take into consideration leaky bucket
algo. Leaky bucket is simple and say we place a queue of a certain capacity, so the request keep getting pushed to queue and
is sended to the server at specif time only i,e the constant processing time, so even if a burst comes in, then also the the request is send to the server at constant processing times thus this type of algo doesn't allow burst in system
and if the capacity of the queue is reached, i,e say we are allowing 5req/user/min and thus capacity of queue will
be 5 in that time frame, now request keeps getting pushed to queue and then to served to server, if in that time frame
greater than 5 request came in then subsequent request are dropped.


**3) Fixed window**

In fixed window implementation, say we have constraint of 5req/user/min.

So we maintain a threshold i,e say 5, and we maintain a counter which gets reset to 0 after every window
frame ends i,e 1 min in this case. As any request within that time frame comes, we increment the counter.
If in that specific frame, the counter reaches the threshold value then the subsequent request is dropped until
the counter is reset back at end of window frame.

Now at T=0 -> T=1

3 request came in so we allow

Now again at T=1->T=2

5 request came in so we allow

again T=2->T=3 6 request came in, 5 are allowed and last one is dropped.



T0----------------->T1------------>T2
    a,b,c               a,b,c,d,e,f
    allowed            (f is dropped)

This algo looks simple but has a issue, say at t=0 -> t=1 we have 3 request so counter reached 3. At t=1 counter
is again reset back to 0 and again request came like a,b,c,d,e,f counter reached 5. it became equivalent to
threshold thus it cant server more request until T=2. However the main aim was to server only 5 request per user
per minute now lets say between a Time t0->t1 i,e t=0.5 and a time between t1->t2 i,e t=1.5 this is also
a window and say 

at t=0.5->t=1 4 request came and it got server
and now at t=1 to t=1.5 5 request came and it got served

so in total in this time frame of 1 minute i,e t=0.5 ->t=1.5 total 9 request are served and thus this
violates our fundamental work of rate limiter and thus this fixed window algo can be optimized via sliding window
algo and is most commonly implemented algo for rate limiter in interviews.


**4) Sliding window**

Sliding window is more improvised approach for fixed window problem.

Lets understand how sliding window works:

Say we are allowing 2req/user/min

so first request came in at 0:05, i can allow it so i place this time stamp in a array, this array will be sorted
as we are dealing with upcoming time and time moves forward only.

[0:05]

Now second request came, at 0:55

we checked that first request was at 0:05 and the time difference between these two is 0:50sec- i,e its within
the threshold of 1 min, so i allow it

[0:05,0:55]

Another request came in at 1:00 min, so I again check diff between first request and this i,e 0:05-1:00 i,e 0:55sec
its within time range however 2 request are already been given access in this frame so the third request is blocked.

Now another request came at 1:15.

Now we check again with first request which was at 0:05 and time diff is 1:10, which is above the time range
now 0:05 first request is not needed and thus we can remove it and push this request and allow it

so now [0:55,1:10]

again another request came at 1:45, we checked with first request i,e 0:55 so diff is 1:45-0:55 i,e 50sec, its
within time range and we see that we have already served 2 requests so we discard this request.

Another request came at 2:05, again we check diff  i,e 2:05-0:55 i,e 1:10 it exceeded time limit,
we can allow it, thus we remove 0:55 entry and push it.

[1:10, 2:05] this is how sliding window approach works.

```typescript
class SlidingWindowRateLimiter {
  private requestArray: number[];
  private threshold: number;
  private timeFrameInMinutes: number;
  private timeFrameInMilliSeconds: number;

  constructor(threshold: number) {
    this.timeFrameInMinutes = 2;
    this.timeFrameInMilliSeconds = this.timeFrameInMinutes * 60 * 1000;
    this.threshold = threshold;
    this.requestArray = [];
  }

  makeRequest(): boolean {
    const now = new Date();
    const entry = this.calculateMilliSeconds(now);

    if (this.requestArray.length === 0) {
      this.requestArray.push(entry);
      console.log("Request is allowed");
      return true;
    }

    const firstReq = this.requestArray[0];

    if (entry - firstReq < this.timeFrameInMilliSeconds) {
      if (this.requestArray.length < this.threshold) {
        this.requestArray.push(entry);
        console.log("Request is allowed");
        return true;
      } else {
        console.log("Request denied, please try again later");
        return false;
      }
    } else {
      this.requestArray.shift();
      this.requestArray.push(entry);
      console.log("Request is allowed after cleaning up old requests");
      return true;
    }
  }

  private calculateMilliSeconds(date: Date): number {
    return date.getTime();
  }
}

const rt = new SlidingWindowRateLimiter(2);
console.log(rt.makeRequest()); // ✅ allowed
console.log(rt.makeRequest()); // ✅ allowed
console.log(rt.makeRequest()); // ❌ denied

setTimeout(() => {
  console.log(rt.makeRequest()); // ✅ after 2 min, allowed
}, 120000);
```

Rate limiter handling can be done via many ways like say 429 status error code which means that too many request,
however this does not gives user the understanding that whats the limit or when he should be trying again so to handle
such scenarios some specific request headers can also be sent along the rejected request like like Retry-After or X-RateLimit-Limit.