**Load balancer**

A load balancer is used to route traffic to different number of servers in a cluster.

Say we have multiple clients and multiple servers, so instead of routing all the load/traffic to a single
server , the traffic should be distributed equally and uniformly across all the servers and thus its the responsibility of the load balancer to help in doing so.


Client 1   -------------------------------
                                                                                      server1
Client 2 ---------------------------------
                                                                                      server2
Client 3 ---------------------------------     Load Balancer ------------------------
                                                                                      server3
Client 4 ---------------------------------

Client 5 -----------------------------------

The advantages of the load balancer is

a) Reduce load on servers
b) Reduces down time of application as in case of server down , it can redirect the traffic to other servers.
c) Maintains meta data of servers like health check
d) Help in rolling update to applications newer version when we down a server and update them one by one.
e) Help in predictive analysis that at which time of day the load is max and then can perform analysis on it.

**Route request via load balancer**

Now since the load balancer is capable of storing meta data of the servers like say health status and
the last request being routed to which server and thus via some algorithms on the metadata for these servers (like
round robin), the load balancer is able to route the request to different servers.

**Types of Load balancer**

There are two types load balancer

1) L4 load balancer
2) L7 load balancer


**L4 Load balancer**

L4 load balancer are those kind of load balancers which are present at layer 4 in OSI model i,e the Transport layer either on client side
or at server side.

Lets consider the case of it being present at the server side.

So once a request passes through all the layers on the client side , then de-encapsulation happens on server side where the data will be flowing from physical layer to application layer, now this data just before reaching transport layer has crossed network layer.

So this data is in segments now and is encrypted even, since it hasn't reached the presentation layer thus it not being decrypted till yet.
With this little data the L4 load balancer is not able to perform much computation and can only access stream of segments formulated via TCP or UDP

Thus limiting the ability of L4 load balancer to perform great computation but it can make routing decisions based on the TCP/UPD .
 
So L4 load balancer don't have access to messages just the IP ports as in transport layer and thus formulates routes based upon that decision.

Ex: NGINX in L4 mode with stream module.


**L7 load balancer**

L7 load balancer are those kind of load balancer which are present at layer 7 in OSI model i,e Application layer at server side or at client side.

Lets consider the case of it being present at the server side.

So once a request passes through all layers of client and reached the server's OSI layer, so in case of server its a de-encapsulation
as data is flowing from physical layer (L1) -> Application Layer(L7) for server side.

Now L7 load balancer is present at application layer (L1) at server side. So the request which is received to this L7 load balancer
is complete, enriched with everything it need like server ports, mac address, IP etc. So these types  load balancer can do a lot of
computation and then based upon the data can take computation decision to route the request to respective server.

Moreover they can help in logging of request in order to identify which request are coming our servers.

L7: load balancer can be used to terminate SSL/TLS.

Lets understand this suppose we have a client sending encrypted request to a server and now L7 load balancer is present at
application layer, in real world there is no layer its a theoretical concept and thus L7 load balancer is ideally present at
combination of application and presentation layer so this encrypted request instead of getting decrypt by the server itself can be
decrypted by the Load balancer only and thus server can receive a plain request.

This reduces over head on servers.

Moreover l7 load balancer can also be used to decompress compressed data.
Since L7 load balancers have great computation ability thus it can store logs of the request which are reaching our target servers.

Some example of L7 load balancer are NGINX, AWS ALB