HLD Practice Notes


1) **Design rate limiter**

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


**2) Design object store (S3: simple storage service)**

s3 bucket is a object store which stores data in form of objects in cloud. An object store like s3 has certain things like

bucket: consider it as a container inside the entire store where we can store data in form of object, every bucket has a bucket name.
object: it refers to the data which we store in the bucket, this data can include meta data, key etc.
key: it refers to the unique name of the object like the entire path of the object inside the bucket

The key characteristic of s3 is that we can take our or read data inside a bucket using an api , the api looks something
like this.

So lets consider an bucket example like

https://my-photo-bucket.s3.amazonaws.com/profile.jpg

Here my-photo-bucket is the bucket name where as profile.jpg is the object's key i,e the unique path to object inside my bucket.

Now there are some important functionalities which a bucket can do like 

a user can createBucket, upload data in bucket, download data from bucket .

Since we are creating a data store and therefore this datastore should be judged by a size so lets consider some matrix
say we have 1M user, i,e 1 * 10^6 users. Every user can create 10 buckets and every bucket can have 100 objects where average
size of every object can be 100kb.

So the overall size is (1*10^6) * 10 * 100 * (100*10^3) = 10^9 * 10^5 = 10^14 = 1pb

10^3 = 1kb (kilo byte)
10^6 = 1MB (mega byte)
10^9 = 1GB (giga byte)
10^12 = 1TB (tera byte)
10^15 = 1PB (peta byte)

so we have to create a bucket of 1PB. 

Now consider a data model, in order to simply the operation of reading data from bucket, we can store some kind of metadata.
This metadata will help us in deducing the exact object from the main memory. Since we are trying to reduce the cost here
and thus we can simply use a HDD or a disc for storing the main data objects.

So the data model can look something like:

{
 id: xxxxxx,
 bucket_name: xxxxx,
 object_path: xxxxxx,
 region: en_us
}

id is unique id, bucket name can be the bucket name , object path is the key of the object inside the bucket,
region can be consider in case we wish to design this database based on different regions at time of scaling.

Now one data model or the meta data can take say approx ~= 100bytes

so we have 1M user, i,e 1 * 10^6 users. Every user can create 10 buckets and every bucket can have 100 objects 
so overall meta data size can be

10^6 * 10 ^ 100 ^ 100 = 10^6 * 10^5 = 10^11  ~= 1Tb although 1Tb =  10^12

So we need 1tb to be stored as metadata.


So now lets consider some high level design before diving deep into nuances of everything.

So client makes a request, reaches say a load balancer, redirects it to application service, the application service
interacts with user service for authentication and authorization, if authorized, sends the request to meta data 
service, gets the metadata, sends request to data service, gets the data and sends back the response.

Now lets dive deep into meta data service

So meta data service's responsibility is to store the meta data in case of a upload request and to fetch the metadata
in case of download, and even to fetch all meta data corresponding to a bucket name in case of list of list all objects
of a bucket.

Now based upon above calculations we agreed that 1tb of data is to be stored as metadata.

So coming to point of choosing database for this meta data. Ideally 1Tb is a lot of data and even considering the
possibility of scaling that 1Tb of data can be increased in future as more numbers of users will be using the application 
therefore in order to make this operations fast we can choose some database which support sharding.

MongoDb is a better option. Now sharding needs to happen on a shard key i,e based on what property we want to shard data 
into multiple nodes, so in this case the shard key can be based upon the bucket name.

Now there can be multiple ways to do a sharding like dynamic partitioning or consistent hashing. Lets say we go via consistent hashing.
Now via using consistent hashing say be hash based on bucket name, a hash value is generated and sent to that shard. Now upon retrieval
of some object from that bucket name or listing all objects of that bucket we will again hash the bucket name, we now know which shard it will
be in and thus retrieved the meta data info from that shard.

Now a main problem can arise in our bucket, that wether we need to maintain versioning or not. Versioning means that if in case someone modified the object
and again pushed to the bucket, so how will be able to maintain versioning in meta data as well.

a) One way or simple way is also to maintain a version in the metadata object i,e the meta data will look like

{
 id: xxxxxx,
 bucket_name: xxxxx,
 object_path: xxxxxx,
 region: en_us
 version: xxxx
}

Now things change, so previously one meta data point was having size ~= 100bytes now say it gets increased via say 120bytes, 
so overall size of meta data will get increased i,e 

10^6 * 10 ^ 100 ^ 120 ~= 10^10 * 12 =~ 12Tb approximation

Previously we were dealing with 1 Tb now we are approx dealing with 12 Tb. 

However this wont be having an impact on the over all HDD storage needed for data service as we are putting a hard limit
of 10 buckets per user with 100 objects in each bucket, even if they create multiple versions of the same object then 
still they are allowed only 100 objects.

Now in this approach the meta data size limit has increased from 1Tb to 12TB, this needs more shard and computation and 
performance will also impact.

Now there is also a second way around.

b) We maintain only the latest version in our meta data and for the older versions as if the business suits that older versions will
not be needed frequently or will be used lesser as compared to newer versions we can store only the newer versions of metadata in the mongo
and the older versions can be stored in some disc generally HDD and if needed it can be retracted over from the disc or to some low cost
storage areas. Although with this a little operational latency can come into picture for older versions however its cost effective.


now lets dive deep into data service

so after retracting the meta data from the meta service in case of read or updating the meta data through meta service in case of
write, the request goes to the data service.

Now we are dealing with 1pb data, and s3 is generally low cost there fore s3 stores the main data inside HDD or disc storage only.

Now say we can have 1 disc of 1Tb so in order to store 1pb of data we need 10^15/10^12 ~= 10^3 = 1000 disc or nodes.

Now 1000 disc or nodes is a very huge number and even if on scaling say the data needed becomes more like 50Pb thus more number of nodes/disc
will be needed. 

Now there can be two ways here, one we consider one node or disc in one shard and also creates replicas of shard , so in case any node is down
then the replica will be able to handle the request but it needs over head as during write operations, replicas needs to be synchronized
to main node and also adds up to space as replicas are present.

Another way can be to create one shard of say 3 nodes.  Now any of these  3 nodes are replicas and contains data, in case any node goes down,
there is a chance of entire data loss and thus a replica of this shard is needed, in case the main shards node goes down then a new node
can be up in main shard and the data can be replicated from the replica's shard node and by that time the replica's shard node can
take care of the operations.

Now a orchestrate service will be needed to monitor the health of the nodes and handle in case of a node failure.

We can even distribute these shards or this entire system based on geo location which is also passed as parameter to meta data.
If our application is global then why a Indian user need to send data to a US server. Rather we can create different data centers based
on geo location.

So say Indian user data will go to Indian data center and US user data will go to US data center.