**Scaling load balancer**

Every system has some limits like the max RAM it has, CPU computation etc. Consider a scenario in which our load balancer
is capable of handling 10k req/sec. However now our application has scaled and now we wish our load balancer to support
15k req/sec. How this can be achieved is what comes under scaling load balancer.

Suppose this below is the current scenario.

Client 1   -------------------------------
                                                                                      server1
Client 2 ---------------------------------
                                                    (10k req/sec)                     server2
Client 3 ---------------------------------     Load Balancer ------------------------
                                                                                      server3
Client 4 ---------------------------------

Client 5 -----------------------------------


Now we can place another load balancer which can also take 10k req/sec , in this way now our system will be able to overall handle
20k req/sec so now the system architecture will look like:


Client 1   -------------------------------
                                                                                      server1
Client 2 ---------------------------------
                                                (10k req/sec)                         server2
Client 3 ---------------------------------      Load Balancer1
                                                                                      server3
Client 4 ---------------------------------      (10k req/sec)
                                                 Load balancer2
Client 5 -----------------------------------


Now one problem will arise, how will we be able to distribute the traffic amongst these two load balancer i,e loadBalancer1 & LoadBalancer2, one idea is to place another load balancer say the main load balancer whose responsibility will be to distribute the load between these two
load balancers.

However this design has a flaw, since the max limit what our load balancer can with stand is 10k req/sec so the main load balancer will also
be eventually able to handle only 10k req/sec and thus the problem is not solved.

The correct or the ideal way of doing it is once the client made a request, it will get to DNS for resolution of the IP, so if the
DNS resolves that request which will hit our server into 2 A type DNS record, two because we have two load balancer, so suppose our load balancer1 has ip IP1 and load balancer 2 has IP , IP2 so the DNS record which will be there after DNS resolution of the request will be

A -> [IP1, IP2]

Now the client can hit either one of them and thus that loadBalancer will get hit and it will take care of routing the request to node/server
accordingly.

However this system will work perfectly fine but the responsibility of a load balancer is few more things apart from only routing 
request to server/node i,e

a) Maintain health record check of nodes/servers
b) Log the request which are hitting the server for some analysis.

Now consider a) task i,e Maintain health record check of nodes/servers. Suppose we have 2 load balancers and n servers/nodes.
So every load balancer will be sending a request for health check to every server after 5 sec which is an over head and in case
load balancers increases and servers also increases its not a viable thing to do.

Thus in order to tackle this we place a registry in between , the job of the registry is to do regular health checkups of nodes/servers.
Even store metadata for the request.
In case a node/server is down we can configure the registry to make another instance of node/server in the cluster.
This registry can continuously publish data regarding the node/server health to its subscribers which are the load balancers.

This registry can even help in auto scaling as we can configure it to increase the nodes if the CPU limit exceeds 90% consumption.

In this way this arrangement is most appropriate for load balancer scaling.



Client 1   -------------------------------        Registry
                                                     |                                server1
Client 2 ---------------------------------           |
                                                     |                                server2
Client 3 ---------------------------------      Load Balancer1
                                                                                      server3
Client 4 ---------------------------------      
                                                Load balancer2
Client 5 -----------------------------------


One example for such registry is ZooKeeper.