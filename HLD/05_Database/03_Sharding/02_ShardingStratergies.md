**Sharding strategies**

Sharding strategies refers to the strategies by which we will be able to shard our data across different data points.
So suppose we have 1 tb data, so how will we be able to shard this data across different nodes via strategies comes under
sharding strategies.

There are three different sharding strategies:

1) Random key
2) Key range
3) Hash key


**Random key**

Suppose we have a database cluster of 5 nodes and we need to shard data to these 5 nodes, for say a data with key, k1 comes
in we assign it randomly to any of the 5 shards , now again another key k2 comes so the same process continues. Now since random
assignment is happening on any of the shards and thus the complexity for insertion is simply 0(1), however the problem with
random key strategy comes in when we need to find a key , say key1, now we don't know where this key is sharded on which node and
thus the read query will take 0(n) time where n is the total number of shards.


**Key range**

Suppose in our 5 shards, we have keys ranging for nodes1,2,3,4,5 respectively as A->E, F->J, K->O, P->T, U->F.
Now say a key in range F->J comes in then it will be sharded into node 2 directly.

The problem with such type of sharding is that it can lead to hotspot i,e one node can be comparatively storing a very large amount
of data.

Lets take an example how it happens say we are sharding data based on timestamp, say we have three nodes in database cluster.
Node1 stores [-infinity, T1]
Node2 stores [T1,T2]
Node3 stores [T2,infinity]

now node3 will become a hotspot, as most recent data which will come after T2 will always be redirected to node3 and thus
node3 will have greater data as compared to others as time increases. Moreover it can also led to skewed sharding.


**Hash key**

In hash key sharding strategy, a hash function is responsible for calculating a ranged hash and all the nodes are
being associated with a hash value in that range. As soon as a key comes in, its hash is calculated and its being written
on the respective node associated with that hash.

The biggest problem with hash key sharding is about scaling or scale down, say after some time we wish to add more number of shards
in our database cluster than the entire hash function should be changed. And even rebalancing of this data amongst all the 
present nodes now becomes troublesome as there has to be a lot of data movement.

These all problems of hash key sharding where problems with data of scale up and down can be overtaken by consistent hashing concept
which is explained in rebalancing strategy.