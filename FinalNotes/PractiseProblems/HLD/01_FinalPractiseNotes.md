HLD Practice Notes


**Generic approach**:

The generic approach is to first understand the requirements like how many users, whats the active user per day.
Then to come up with some computation like DB requirements, network etc.

After that create services which will be used for different main main use case.
Then dive deep into every service. Compute possibility of this service having its own DB , sharding, shard key etc.
See twitter design for example.



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

10^3 = 1kb (kilo byte) - Thousand
10^6 = 1MB (mega byte) - Million
10^9 = 1GB (giga byte) - Billion
10^12 = 1TB (tera byte) - trillion
10^15 = 1PB (peta byte)  - Quadrillion

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

Now there can be two ways here, one we consider one node or disc in one shard and also creates replicas of shard , so in this case if any node is down
then the replica will be able to handle the request but it needs over head as during write operations, replicas needs to be synchronized
to main node and also adds up to space as replicas are present.

Another way can be to create one shard of say 3 nodes.  Now any of these  3 nodes are not replicas and contains main data, in case any node goes down,
there is a chance of entire data loss and thus a replica of this shard is needed, in case the main shards node goes down then a new node
can be up in main shard and the data can be replicated from the replica's shard node and by that time the replica's shard node can
take care of the operations.

Now a orchestrate service will be needed to monitor the health of the nodes and handle in case of a node failure.

We can even distribute these shards or this entire system based on geo location which is also passed as parameter to meta data.
If our application is global then why a Indian user need to send data to a US server. Rather we can create different data centers based
on geo location.

So say Indian user data will go to Indian data center and US user data will go to US data center.

Now coming to the point of scaling regional database, since our main storage is composed of disc and there fore, the orchestra service 
can maintain the size of the disc as well, and say in case any node or disc reaches above 70% then system generates advisory to create more
nodes or disc.

Now since we are designing a cheap storage and thus we prefer an HDD over an SDD. Moreover lets talk about data organization inside this HDD as
data organization plays a major role on in performance of disc storage even like HDD.

Data storage refers to how data is arranged physically and logically and helps in performance while dealing with huge amount of data. A bad
data organization like dumping everything into one folder makes read/write relatively very slow and thus proper data organization techniques
need to be taken while storing such huge chunk of data like 1Pb.

a) File per object data organization:

In file per object data organization, the bucket name in case of s3 will be considered as folder whereas every object inside the bucket
will be considered as a file so its like a folder-file storing technique. Although it looks relatively simple however this is a big problem
with file per object data organization as every file system stores data in fixed block sizes, generally 4kb. Now if a file is lesser than
4kb say even 1000bytes then also 4kb fragment will be used, and say 3kb file is there then also a 4k fragment is used.
For a 4.2kb file two block segments will be used i,e 8kb. So ideally this is leading to memory wastage. In simple if we have all 4.5 kb files
then 500mb of files storage will take 1Tb of disc space.  Thus a better and more prominent data organization technique needs to be taken into consideration.

b) WAL( write ahead log) data organization:

In WAL (Write-Ahead Log) data organization, instead of writing each object as a separate file, we append all 
objects to a single data.log file and maintain a key → offset index in memory.

Each object entry contains metadata like key, size, and checksum (to ensure integrity).

When a PUT request comes, we append the object to the log and update the index.

So suppose a user uploads three objects so we update the index as 
{
  "img1": 0,
  "img2": 120,
  "img3": 340
}

and write to data log file as:

PUT key: "img1", value: <100 bytes>
PUT key: "img2", value: <200 bytes>
PUT key: "img3", value: <300 bytes>


When a GET request comes, we use the index to find the offset and read the object from the log.
This is more efficient than file-per-object storage, especially for small files, because:
It avoids the overhead of managing many individual files (which can waste disk space and inodes)
It enables fast, sequential writes

now img 1 has size 100 bytes and offset is 0, means if someone wants img1 then start from 0 till 100 bytes and you can get the img1,
similarly for img2 starts form  120 bytes and see 200 bytes from 120 bytes to get img2.

Now one observation is like the offset of img2 is set from 120 bytes although img1 size is 100 bytes only as remaining 20bytes is
left for some meta data like say header or checksum. This checksum can be used to check the integrity of the data that its not corrupted etc.

Now once a read query comes, in it goes to index file and get the corresponding offset for that object key, now goes to data log file
and get the data based upon the offset.

WAL approach is better as compared to file per object data organization as it don't lead to wastage of memory via maintaining offsets.

For deletion of an object inside the bucket, we remove the entry from the index and say in data log pass a boolean with mark to delete as true.
Regular garbage collector can work to remove these mark to delete entries.




**3) Tiny url generator**

A tiny url generator's responsibility is convert a long url which may be even composed with additional parameters like
say query params etc to a short understandable url like say a long url like 

https://www.geeksforgeeks.org/batch/sd-self-paced-2/track/Design-Problems/video/MTU5MzM%3D

can be shortened to https://tinyurl.com/2jrm27h3.

Once the user clicks on or makes request to the short url internally he is redirected to long url only.

Now lets understand the use cases that why such system is needed. Sometimes we are doing some campaigns and people are generally
reluctant on clicking on long urls which also indicates campaigns so these short urls can act as disguise even, moreover
sometimes with these long URL's the QR code which we want to scan becomes more denser but with short url these QR's are even less dense
and easier to scan.

So there are two main functionalities which our tiny url generator can perform one

post (i,e generating a short url corresponding to a long url) -> payload: long url -> response short url

get(hits the short url and gets redirected to long url interface only) -> short url -> redirects to long url interface.

Now lets do some guesstimates in order to understand our system requirements.

Say we are designing an application for around 5M users i,e 5 * 10^6 users. Now consider this application as read intensive
where the R/W or read/write ratio is 100, i,e per 100 reads one write can happen which is fair depending upon the use case.

Write here means a post request to get the short url corresponding to a long url.
Read here means hitting or sending the short url and reaching to the long url.

Now, say this application for now is designed for 5 years and can be eventually scaled up. The application serves a use case for
analytical point of view even, i,e say for a marketing campaign we need to even see how many clicks were there on the short url.

It should not generate predictable links as it then becomes vulnerable to DDOS attack like some dictionary attack in which
attacker might try hitting all possible urls which can be derived from the long url.

Lets try to get some parameters like QPS, bandwidth, storage needed.

QPS: i,e query per second.

  An fair assumption can be that 5M urls are created per day. Meaning 5M/24*60*60 urls are created per second.
  So 5*10^6/20*50*50 (approx) = 5*10^6/50*10^3 = 10^6/10^4 = 100 request/second 

  100 req/second are write request.

Now R/W ration in application was 100 so say 100*100 = 10k req/sec for read.

Storage: How much storage is needed.

  Storage will come to picture for write operations, say a long url is to be mapped to a short url.
  Combining the sizes of long url and short url we can say long url can be avg 170bytes where as the short url will be around
  30 bytes so total url size will be around 200bytes approx.

  there are 100 req/sec for write So in five years

  5 years has 5 * 365 * 24 * 60 * 60 seconds 
  100 req in 1 sec so

  100 * 5 * 365 * 24 * 60 * 60 req in 5 years.

  1 req is approx size 200bytes so 100 * 5 * 365 * 24 * 60 * 60 req will have size

  (100 * 5 * 365 * 24 * 60 * 60 * 200) = (100 * 5 * 400 * 30 * 60 * 60 * 200) = 10^9 * 4320 ~= 5000 * 10^9 = 5* 10^12 = 5TB

  Now we need to store 5Tb of data thus our choice of database should be the one which by default supports
  sharding like mongo Db.

Bandwidth:

  Predominantly the application is read intensive, 1 write there are 100 reads so read can be taken into consideration
  for bandwidth estimation.

  There are 10k read request/sec and the url size which gets responded back is a long url approx 20bytes.

  10k * 20 /sec = 2 * 10^4/sec even if we increase this approximation say 2 * 10^6 = 2Mb/sec or even may be say 10 mb/sec
  which is very suitable bandwidth estimation as most modern network can support this.


Now we have mentioned that we will also be needing some analytical say how many time the tiny url is clicked
so this means there should not be caching at client side and every time the client request for get on short url
it should reach to server, to ensure this we can use HTTP code 307.

307 HTTP code means: Temporary redirects and the url is not cached at the source or the client.

In contrary an HTTP code 301 means moved permanently and the url is cached at the source or the client.

So lets understand the high level design how it can look like:

Client sends a request to generate tiny url from long url, reaches server. The server can have a cache which will be used
in read operations. The server can generate a tiny url corresponding to the ling url and store it in database.

Now lets understand how much cache are we talking about.

We agreed the application is read intensive and 10k req/sec for read is coming. Say if we store data for 7 days. 

However we will be storing say a store map like 

{

  shortUrl: longUrl

}

so short url can be say 20bytes and long url say be 180 bytes so overall 200bytes.

So 10k * 7 * 60 * 60 * 200 = 36*7*10*10^5* 200 = 37*7 * 10^6 * 200~= 50*7 * 10^6* 200 ~= 450*10^6 * 200=  90*10^9 = 90Gb

Caching 90Gb is not a very big deal for modern applications and cache like redis cache. And its not that cost inefficient, 
thus we can cache 90GB data. Here the cache eviction policies can come into picture that how will we be evicting data from our cache once
cache size is reached.

Now lets talk about key generation algorithm , that how will we be able to generate a tiny url from a long url.

**a) Using hash:**
 
Hashing algo like SHA256 or MDS can be used to compute hash corresponding to the long url however, the hash generated is of some length and
this length plays a vital role in determining the size of RAM, storage etc. Thus lets understand that what size could be best suited for our
short url.

Now the overall characters that can be taken into consideration while shortening url is

a-z, A-Z and 0-9 which is 26*2 + 10 = 62.

Now lets see how many tiny url we need to generate in 5 years

we agreed above that 5M urls are created per day and thus in 5 years it will be 5M * 5 * 365 ~= 5M * 5 * 400 = 100* 10^8 = 10*10^9 = 10B

so considering 62 over all characters to be considered from thus the ideal length 

62^6 = 60B, thus we can say 6 length is ideal.

Now if we use an MDs hashing algo thus it generates a 32 char long hash which is non repetitive and its pattern cant be determined.
However since we saw that our ideal length is coming somewhere around 6 so a 32 long char is not needed. Thus we can even splice
or can find random 7 index from the MDS generated hash and then use them to store the tiny url corresponding to long url.
An possibility of collision can always arise. Meaning that a long url being resolved to same short url can be generated which are used before

and therefore lets talk about collision handling methods which can be incorporated:

1) when we take 6 length, the total urls which we can support is 60B our need was 10B. So its above only however on increasing the 
length of the url like say 7 or 8 then we can reduce the possibility of collision to a great extent. But this needs more space.

2) However even if still collision happens then we can use concept of salt, in this what happens lets say we generate a short url and this url
was already present in our db, so we increase the salt so before we were trying to formulate short url for

https://www.geeksforgeeks.org/batch/sd-self-paced-2/track/Design-Problems/video/MTU5MzM%3D and it resulted in formulation of short url like

https://tinyurl.com/2jrm27h3.

Now this url is already in use for some other url and thus we provide a salt like we generate a tiny url for 

https://www.geeksforgeeks.org/batch/sd-self-paced-2/track/Design-Problems/video/MTU5MzM%3D-1 where 1 is the id, now we generate a short url for it
again if this results in a collision then we increase the id to 2 and so on.


Now these all things increase overhead on our application service as first a tiny url has to be generated and then this tiny url has to be
verified that its not present in db and if it validates then only we insert this in db else we regenerate it.

Thus a better and efficient approach will be to introduce a key manager service whose responsibility is to generate keys asynchorunlsy.

**b) Generating keys offline:**

So initially this key manager services generate 100K urls and it can have its own db and thus store them. Now a request say a post request comes to main
application service, this application service can have its own cache. Now the application service asks the key manager to provide a key. This key
is used as short url for the requested long url. Now this gets inserted in the DB of application service and as a cache.

In case a certain threshold is reached as used keys in key manager db then it can again asynchronously start generating keys. Which can be used by the
application service.


Regarding the concept of monitoring, i,e the number of clicks we can use services like prometheus and grafana which can helps us state logs
and visual live monitoring.



**4) Designing twitter platform**

Lets suppose we have total users in twitter as 1.5 billion. Now with these huge amount of users we need to scale down the problem
so say we need to consider only active users so the number of active users in the application per day is 500 million users i,e 1/3rd 
of total users in twitter. Lets consider an avg of 1 tweet per user per day and reads 50 tweets per day.
Support for media search as no for simplicity of problem and search functionality in application as no for now but we can 
consider it as a add on feature later on. When a user logs in, he needs to see the tweets of his followings for say last one day.

Now lets consider some guesstimates.

Write- 1tweet per user per day. So 1 tweet per user. Total users 500M. Thus 500M tweets per day.c
Read- 1 user reads 50 tweets per day so total reads are 50 * 500M = 50 * 500 * 10^6 = 25*10^9 tweet read per day.

Storage- 

Consider every tweet to be max 250 char, and 1 char as 1 byte so total 250 bytes. Consider 50 bytes additional for metadata etc.
So one tweet is 300 bytes. 

Total capacity = writes = 500M tweets * 300bytes per day = 500*10^6 * 300 = 15*10^4*10^6 = 15*10^10 bytes per day
Consider capacity for 5 years = 400 * 5 * 15*10^10 = 20*15 * 10^12 = 300 * 10^12 = 300Tb approx

Network requirement:

(Read + write per day)*tweet size -> (25*10^9 tweets per day read + 500M writes per day)* 300

(25*10^9 tweets per day read + 500M writes per day)* 300
= (25*10^9 + 500 * 10^6)*300 = 7.65 TB/day

Now we need to store 300Tb of data for 5 years for simple write of tweets , any data between 1-2Tb is not generally
considered for sharding, however this system needs sharding.

Now lets consider some major services in our application:

User service:

User service will be responsible for creating user, making a user follow another user and getting users followers.

Post -> /user/new (creates new user)
Post -> /user/follow (jay started following another user)
Get -> /user/followers (get all followers of a user)


Tweet service:

Tweet service will be responsible for getting the tweets which the user can read and post a user tweet.

Get -> /tweet
Post -> /tweet


Search service:

Lets say this service is responsible for searching a tweet say /tweet/?searchString.

So the high level design of our twitter for now looks like:

Clients makes a request, goes to load balancer, this request properly gets redirected to user service or tweet service or search service.


Now lets dive deep into User service:

Primary goal of user service is to cater info about user for registration and also to maintain data about followers so we can have
two tables.

Lets consider a data model for users.

{
  id: xxxxx
  userName: xxxxxx
  handle: xxxxxx
  Dob: xxxxx
  email: xxxxxx
}

consider a total size of 100 bytes/record.
There can be total 1.5B users so table size needed will be 100 * 1.5B = 1.5 * 10^9 * 100 = 1.5 * 10^11 ~= 1.5/10 * 10^12 = 0.15Tb data.
Generally 1-2Tb is fine so we can say there is no much need to shard the user table. However if in case we need to distribute users
globally say US, India etc so its better to have sharding as make distributed system and moreover in this regional distribution we don't want
request from India to go to say US db's and it can increase latency.

Now we can also maintain another table for maintaining followers for a user so, 

the data modal in this case can be

{
  id: xxxx
  user_id:xxxx
  follow_id: xxxxx
}

Consider the total data model size to be around 50bytes.
Consider an average a person follows 1000 people and there are 1.5B users
So total size needed here is 1.5B * 50 * 1000 = 10^13 * 1.5 = 15Tb 

This needs sharding as 15Tb is well above 1TB-2Tb shard limit.

Now shard key is imp is consideration for sharding and thus the main query pattern in this case is 
give me all the followers for a user so user_id is ideal candidate for consideration of shard key.

Now question arises do we need indexing on these tables if yes then on which column. For users table we need need
indexing as users data will be needed when he wants to see his profile so its not queried frequently.
However for the use case when user wants to see tweets we will give him the tweets of the people he follows i,e
a continuous query on the followers table is made to fetch followers corresponding to the user and thus a index needs to
be maintained on user_id in followers table.


Let dive deep to tweet service so the data model for tweet service can be:

{
  tweet_id: xxxx
  user_id: xxxxx
  tweet_time: xxxx
  tweet_content: xxxxxx
}

which can be approx 400bytes.

Now user can make 1 tweet per day amd we want to store tweets for 5 years which we calculated above as 300Tb approx.

Now comes imp discussion about the shard key in this case as sharding needs to happen for such huge amount of data and
the main point is that when user wants to see tweets we provide him with tweets of his followings which are 1 day old.
So does this data should be shard on tweet_time or user_id or tweet_id is an imp discussion.

Lets say we consider tweet_time considering the use case that user wants to see tweets we provide him with tweets of his followings 
which are 1 day old.

So what will happen is that say data from 2017-2018 will reside in one node, similarly for subsequent years.
Now every year a new hotspot will be on that node where all data is being written because say in 2024-2025 all data
will be written in one node and thus it becomes a hotspot and is prone to failure.

Now lets consider we shard based on user_id so there will be some people whom are followed by millions of people
some very famous personalities and if they write data, that node can become hotspot. Although its still better than time stamp
shard key but still few people can make or break the system. Moreover if few very huge followings are resided in one node it
can cause latencies.

Now if we consider tweet_id as shard key then also there can be a problem, as user want to see all tweets of his following for say
past 1 day and thus the read query becomes very slow and request has to be sent to all shards as there is no way to know
that the request which user is making resides in which shard. And generally say if we have 100 shards and all 100 shards are needed t0
be checked for a request its not a good approach. 7-8 shards querying is still considered fine.

Thus in order to find correct shard key its better to look for some middle ground which can be
user_id-timestamp this shard key is better as compared to considering any other shard key as it servers the purpose.

So lets say my node 1 contains data for 1->5M users for last 1 day, shard 2 contains data for 1->5M users for last 1-3 days,
similarly other, so in case of read if i need data for say 1000 users coming in range 1->5M for 1 day, we know which node
to search for.

Now sharding can happen on columns which we index upon, so in this case we need to index upon two columns, ie, time stamp and
user_id and thus writes can becomes a little slow.

In order to optimize it, in many db the primary key is by default indexed and can be used for sharding and thus, rather than
creating any arbitrary primary key, we can make user_id + time stamp as primary key and thus it will be indexed by db and
can be used for sharding.


Now search service can be a add on in our application. In this we can use text search db, like elastic search which is helpful for
searching in data.
