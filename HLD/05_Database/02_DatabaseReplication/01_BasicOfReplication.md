**Replication**

Database replication refers to the concept of storing/maintaining multiple copies of our data in multiple
database nodes all connected via a same network in one Database cluster.



                                                                            DatabaseNode1

Client ----------------> Server ---------------------                       DatabaseNode2
                      
                                                                            DatabaseNode3

Database nodes are nothing but machines hosting database and these machines are interconnected via same network.

Database Replication has its own advantages and dis advantages.

**Advantages:**

-Lets us suppose we have geographical presence across multiple countries, so If we have Database Node present only
at one data center say US, then US users will have a fruitful experience with our application however say Indian users
will face a lot of latency and a communication back forth across US data center has to be made every time a request is made.

-It can reduce downtime and have high availability as say one node is down then even other nodes will be able to host the request and the system can keep on working

- Some applications are OLAP where as some are OLTP , so in OLTP we are mostly concerned with few rows/entries of our data
where as in OLAP take example of admin dashboard, we are concerned with very huge amount of data, so with this architecture 
these both can be concurrent on different nodes and we can reduce their interference via distributing responsibility of
transaction so one node and analytical stuff to other node.

**Disadvantages**

There are certain disadvantages also associated with Replication

- Cost increases, as we need multiple machines with some specifications to act as database nodes for our system
- There is a chance of increased latency and inconsistency.
  Suppose we used synchronous manner of updating all nodes of the Database cluster once a transaction is performed then till
  all nodes are updated and have same data(latest data) the request is not complete and therefore the latency increased.

  Suppose we used non synchronous mechanism in which one node is updated in database cluster and request is full filled
  Now other nodes will take some time to get updated with latest data as via they send continuous request for latest updates
  to main node, so there will be a chance that server now has redirected a new request to a node which is still in process of updating
  with latest data or is not yet updated with latest data, then it can lead to inconsistencies in the response of the request.
  Moreover there will be some time lag between nodes updation as say main Node gets updated first at T1, whereas the node1 gets updated
  through main node in T2 where T2>T1 so, there can be a lag in updation of T2-T1.

-High bandwidth is also a concern as the number of nodes in database cluster increases, more bandwidth is needed to update these
all nodes either in case of synchronous updation of nodes or asynchronous updation.
