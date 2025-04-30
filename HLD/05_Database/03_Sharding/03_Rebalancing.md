**Rebalancing**

No matter what sharding strategy we used, say random key, hash key or key range, there is always a possibility
that the shards will be unbalanced, by unbalanced we mean that not all shards contains equal amount of data.

It will be possible that based on our strategy we were able to maintain balancing upto some T time, but as the data
flow increases the shards become unbalanced. So in this situation we need to balance them or even when we add a new shard
so we need to rebalance data again, so by balancing we mean to be able to distribute data equally between the shards.

This can be achieved via some rebalancing strategies :

Now before starting the discussion over the sharding strategies, there are certain expectation from the sharding
strategies like

1) There should be min possible transfer of data from one shard to another shard, the main reason behind it is if a huge
chunk of data is being transferred between shards it could lead to network conjunction.

2) The system should be available for reads and writes during rebalancing phase, its like we cant say to provide a down time
   while we rebalance the shards.

3) After rebalancing the shards should be balanced fairly else if the objective is not achieved then rebalancing is 
   useless.

Now lets talk about the various sharding strategies.


**a) Hash rebalancing**

Leys suppose we have sharded our data using hash based sharding strategy and at this time the data looks like

S0 -> 4,8,12,16
S1 -> 1,5,9,13
S2 -> 2,6,10,14
S3 -> 3,7,11,15

Now say overtime these shards become unbalanced or at current the data with shard s0 having 4,8,12,16 is having in total size
100GB, S1 with data points 1,5,9,13 is having in total 80GB, whereas S2 data points and S3 data points corresponds to total size
of 10 Gb and 2 Gb only respectively so clearly these shards are unbalanced.

Say we decided to introduce a new shard say S4.

Now we need to rebalance the data amongst 4 shards.

If we use a hash rebalancing and say okay whatever data points % N where N is total number of shards will be used to rebalance.

So now S0 will have

S0 -> 5,10,15,20
S1 -> 1,6,11,16
S2 -> 2,7,12,17
S3 -> 3,8,13,18
S4 -> 4,9,14,19

Now if we see what s0 had previously vs after

S0 -> 4,8,12,16(Prev)
S0 -> 5,10,15,20 (after)

It contains no same data points anymore and thus it means most of the data is getting transferred which also means 
it will happen to other shards as well and thus first expectations from the rebalancing strategy that min possible movement
of data is violated and this strategy will lead to network conjunction and thus its not generally used. 


**b) Fixed Partition rebalancing**

In fixed partition rebalancing we create fix partitions inside every individual shards only so say

S0 has partitions like A->C,D->E,
S1 has partitions like F->G,h->j, k->m,
S2 has partitions like  n->q, r->t, u->v, 
S3 has partitions like w->x, y-z

Now say a new shard S4 comes in so we will move some partitions amongst the individual shards to this new shard and thus rebalancing
can happen.

But there are some problems with this, first with heavy traffic coming the hotspot problem may arise within partitions in shard
moreover partitions may also have their own physical limitation so in such case heavy manual intervention is required to
rebalance again , moreover its complex to rebalance these shards as some partitions may be heavy and some may be not, so their
is a heavy partition within a shard has to be moved then its high data movement, thus the best way is dynamic partition strategy.


**c) Dynamic Partition rebalancing**

Lets understand dynamic partition rebalancing with an example say

Partition Range	      Shard
[0–99]	                S0
[100–199]	            S1
[200–299]	            S2

Now say users generate lots of activity in the [100–199] range, so s1 shard is getting hotspot, now the system will
automatically split [100–199] → into [100–149] and [150–199].

Now a shard is introduced so [100–149] is assigned to new shard S4.

Noe the partition looks like

Partition Range	       Shard
[0–99]	                S0
[100–149]	            S4
[150–199]	            S1
[200–299]	            S2

And everything is balanced again without any manual operation.


Now similar to concept that we see in dynamic partition of rebalancing , we can use something similar to make hash rebalancing
better so that min data is transferred. This is know as consistent hashing.

**d) Consistent hashing**

In consistent hashing we use a hash ring, so lets say for sharding we used hashing but this hashing was a little different.
It was in form of hash ring so say we formulated the nodes of cluster in form of ring and every shard we gave a number so

S0-> 0
S1-> 64
S2-> 128
S3-> 192

Now data comes in and we hash the data and shard it like every hash between 1->64 will go to shard with number 64 i,e S1.
Every data with hash 65->128 will go to shard 128 i,e s2
Similarly every data with shard 129->192 will go to 192 i,e shard3 and every data between 193->0 will go to 0 i,e shard0.

Now say via monitoring or via say matrix we got to know that shard s1 is becoming a hotspot, i,e more users are pushing data
whose hash is getting computed between 1->64 and thus now we need to add a new shard , so we divide the data 

1->64 between 1->32 and 33->64.

We copy data between say 1->32 in a new shard s5 , once its complete we push this shard or make this shard a part of our hash ring
now all data between 1->32 will be pushed to shard5 i,e s5.

In this way scaling up and scaling down can be taken care optimally without movement of large amount pf data. Its something similar
to dynamic partition. Just this is based upon hash.


**Increasing system availability**

Sharding can help in system availability as if one node goes down then only a small portion or a portion of data will be unavailable
while rest system can keep running, moreover database like cassandra uses consistent hashing, and also maintain data for say
node s2 i,e from 65->128 in S3 node as well, so in case S2 node goes down then s3 node will be able to accommodate for this failure.


Note:

Note point here is sharding makes architecture complex and we should try n avoid it until necessary.

So before going to sharding we can say

1) Data purging: Say our application is having 20 years of data but we don't need 20 years of data so why not purge data beyond 7 years.

2) If for say some case 1% request need 20 years old data rest 99% need new data so keep new data in db while migrate old data
 to some cheap storage like s3.

1) We can always create multiple clusters of nodes with most recent data in some cluster and then little older in some other
   cluster with less computation power nodes .

So overall sharding should be the last option to resort to. 