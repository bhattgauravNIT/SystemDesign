**Caching**

Cache is basically a small sized temporary storage which is used to store most recently used data for some duration of time.

Suppose we have some data which is used frequently than rather than fetching it again and again from the database which stores
data over a disc and is comparatively slow its better to store it in a cache as it makes retrieval of this data fast and UI/UX experience increases.

Caching is used at almost every layer of computing.

Like at CPU level, caching happens at L1 cache which is faster than L2 cache and which is faster then RAM.

L1 > L2 > RAM meaning RAM has a top layer of L2 cache and it has a top layer of L1 cache.

In browser caching happens at browser cache.

In os kernel level caching happens.


Thus caching is very useful when a data is queried repeatedly and more and its time consuming to fetch it from the disc of database.

However caching should not be used in every scenario like:

a) The data changes frequently which is cached. So assume if we cache a data which is changed frequently than its an over head that
the cache should keep on updating itself with latest data from primary database or data which came from primary database. In such
scenarios the cache version becomes invalid frequently.

b) The time take for a data to be retrieved from the cache and the disc/database is relatively equal, then cache makes no sense.
 It can arise in situations like if the cache is hosted over a remote server, however the database is in a local server then time
 for both of them to respond is approx same.


**Working of cache**

Suppose a client makes a request, this request will go to the cache, if the data which client requested is present in cache and
is retrieved from the cache its a cache hit, however otherwise its a cache miss, now in case of a cache miss, the request then goes
to the primary server which fetches the data from the database and gets back the data, now since its the most recent used data and
thus it is being placed in cache.

A good application can expect a cache hit ration i,e

Cache hit ratio = Cache Hit/Total request(cache miss + cache hit).

to be 0.8 to 0.95%.


**Why cache is fast**

A simple question can pop up that why cache is fast. Cache performance depends upon where it is stored, what its storing and how
its accessed. Cache like Redis, Memcached stores data in RAM on local network which makes it way more faster.

The storing also is no complex data structure its like a simple key-> value pairs , these all things makes cache fast.
