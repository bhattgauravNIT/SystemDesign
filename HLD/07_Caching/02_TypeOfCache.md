**Type of cache**

There are generally two type of cache:

a) Application server cache
b) Distributed cache
c) Global cache

**Application server cache (Local cache)**

This type of cache is present in application server. So consider a request sent from client reaches the server, the application server
is itself maintaining a cache, so if this request's data can be resolved via this application server cache than its a cache miss, else
the server request the primary for the data and place it in cache and respond to the request.

These cache can be used in via in memory storage or even on disc. Cache can be stored anywhere, like even on disc.

These kind of cache is great for single server application, however in case we have multiple application server and there is a load
balancer in place its not effective, lets consider we have n servers like server1, server2, server3.......server n. 

Now every server maintain some cache to it. So say a request r1 comes to load balancer it redirects it to server1, say server1 didn't had
cache for this request data thus it calls primary and fetches the data, stored it in its own cache and provided response.

Now lets suppose the same request again comes to load balancer and this time although server1 was having cache to it, it based
upon load redirects it to server2, which don't have cache to it thus it will again call primary get the data, place it in cache
and responds to request.

Now we see that in cache of server1 and server2 there is a duplicate cache data.

So in case of multi server, the cache miss chances are greater than there is a additional cost as there can be duplicate cache data
present in multiple server.


Thus in such cases we need a better solution like distributed cache or global cache.


**Distributed cache**

Again consider n number of server in our system with say a load balancer, In this type of caching also, every server will be
maintaining some cache to it, however in order to ensure least duplicity, techniques like consistent hashing is used, so say
server1 will be storing cache for 1->10 records, server2 will be storing cache for 11->20 records and so on, now when a request reaches
the load balancer , it hash the request, has info that this hash must be present in which server thus redirects this request to the
specific server.

Since there is an overhead for the load balancer to determine which server to send the request to, thus sometimes we also prefer
global cache.

Moreover the application servers also have some dual responsibility like maintaining an cache, and serving to request and thus
in some architecture in order to have separation of concerns, instead of maintaining cache at servers, we maintain cache at global
level.

**Global cache**

So in case of global cache, a request once come to server, and say we have even n number of servers, instead os storing cache
in respective individual servers, its stored in a global cache, between servers and primary database. So if a request comes,
the server checks the cache, if cache hit, responds back to the request, in case of cache miss, connects to primary, gets
the data and place it in cache and responds back to request. Now since the data is now present in global cache, so when this
request comes again and say previously it was being served by s1 server, however now load balancer sends it to s3 server, so
s3 also will interact with same global cache, finds the data and responds back. 