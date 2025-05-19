/**
 * 
 * Sliding window is more improvised approach for fixed window problem.

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
 * 
*/

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
