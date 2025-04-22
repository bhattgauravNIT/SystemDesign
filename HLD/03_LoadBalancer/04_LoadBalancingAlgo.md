**Load balancing algorithms**

The main use case of a load balancer is to re direct request to the servers, in oder to reduce load on any one server and
help in traffic management. However how these load balancers are able to perform it. This comes under the concept of load balancing
algorithms.

1) **Round robin algo**

Round robin algo is generally used when the response time of every request is mostly uniform or same and the server cluster also
has uniform infrastructure.

Lets consider an example
suppose I have 3 servers/node say node1, node 2 and node3 with configurations as 2cpu,16gb RAM on each of the nodes. So the cluster
has a uniform infrastructure i,e same configuration. Now the response time of every request is also uniform lets suppose, so in case of
round robin the load balancer will send the req1 to node 1, req2 to node 2, req3 to node 3, again req4 to node 1 , req 5 to node 2 and req6 to node 3 and so on......


This type of uniform distribution of load over the nodes comes under round robin algorithm.


2) **Weighted round robin algo**

In this scenario also we have cluster of 3 servers/nodes but this time its not a uniform infrastructure however there is a uniform response time i,e say node1 has configuration 2cpu, 16gb Ram. Node 2 has configuration 2 cpu, 16GB ram but node 3 has configuration of 4cpu and 32GB ram clearly its a non uniform infrastructure, however lets assume that there is a uniform response time.  Now if we simply use round robin
algo to re direct our traffic to our servers then we can see an under utilization of node3. Thus in such scenarios we can use weighted
robin algo.

In weighted robin algo we assign weights to different nodes . So say we mark node 1 with weight 1, node 2 with weight 2 and node 3 with 
weight 3. So now say the request comes in from the client to our load balancer so req1 went to node 1, req2 went to node 2, req 3 went to
node 3, and req 4 also went to node 3.

Now req5 went to node 1, req 6 went to node 2 and req7 and req8 went to node 3 and so on.................


3) **Least connection:**

In this scenario lets consider that a request from a client has come and load balancer is managing load across three nodes i,e node 1, node 2 and
node 3, the response time of these request are non uniform and have high variance.

Now suppose at the current time, the node 1 is serving 12 request , node 2 is serving 14 request, node 3 is serving 16 request. 
A new request came, so the least connection is with node 1 i,e 12 thus based on the least connection the new request is being assigned
to node 1.

Some of common scenarios of high variance response time are database connections and web socket or wss connections.

Wss is protocol similar to HTTPS which can be both secured and unsecured.

ws://yourUrl/ is a unsecured web socket communication

wss://yourUrl/ is a secured web socket communication


4) **Least bandwidth**

This algorithm for load balancing is used when we want to distribute request not based on number of connections rather the network bandwidth
parameters.

Lets take an example I have three nodes in a cluster ie, node 1 , node 2 and node 3. Now node 1 at this time is consuming 300 kb/s bandwidth
this means that the rate of data comingIn-goingOut from the node 1 is 300kb/s

Similarly for node 2 its 800kb/sec and node 3 its 400kb/sec. Now a new request comes in so the load balancer checks that which of the node
is consuming the least network bandwidth and thus it assigns the request to that node in the case above the request gets assigned to node1.

The load balancer monitors the bandwidth consumption of every node and thus redirect the request accordingly.

Lets understand why this algo is important suppose two nodes are handling same number of clients , lets take an example of netflix
so our 2 servers are handling the same number of clients however server1 is consuming low network bandwidth because may be most of the clients
are simply streaming the video at a low quality i,e say 360p however most of the clients although same in number are streaming video at a very
high quality through server2, so server 2 is having high network bandwidth.

Thus in this case when a new request comes in than it should be handled by the server with low bandwidth as its data transfer rate is lesser.


5) **Hashing algorithm**

Suppose a client wants to request for www.google.com so suppose the load balancer has a hash function which takes out hash based upon certain
request parameters like client IP, user ID, session ID , URL, cookies, headers etc.

The result of this hash function is a number which corresponds to a node/server in the cluster. So the load balancer redirects the 
request to that node.

IP address hashing can also be done, in this case same client IP will always result in same hashing result and thus it will always
be redirected to the same server/node. Via this manner we can have a cache corresponding to user which will always gets redirected
to that server onto that server. This can be helpful for applications that require session persistence corresponding to users and want to
redirect the traffic for that specif user to a single same server.
