**Cache Invalidation**

Now we know that cache maintains copies of most recent data used for faster access. However, it might be possible that
the cache data which its holding becomes stale. i,e the primary database is now containing new data may be due to a write
while cache is still maintaining old version of data. This is called cache invalidation, i,e validation of cache is gone.


Now there are some architecture which could help in cache invalidation scenarios and helps the cache
maintain always the newer data.

**a) Write through cache:**

Once a write request comes in, the data is written parallel and simultaneous to both cache and primary database, 
in this way the cache will always have newer and updated data and its data does not become invalidated. However
writes will become a little slow as we are writing at two places simultaneously.

**b) Write behind cache**

Now suppose a write query comes and we write it to the cache, now its the cache responsibility to dump this data to
the primary database. In this case the writes will be pretty fast as we are simply writing to cache, however suppose the
cache goes down then there is a possibility of data loss than some data may not reach primary database.

**c) Write around cache**

This is one of the best caching invalidation technique, in this the write happens on the primary database, and cache data
has some TTL i,e time to live after that live this cache data become stale and cache keeps updating itself frequently with data
from the primary database.