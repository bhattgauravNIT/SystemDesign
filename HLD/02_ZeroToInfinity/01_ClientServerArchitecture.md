Lets understand client server architecture using an example:

Suppose we are building gfg.

So we have clients like web application, mobile, tablet, watch etc.

There can be two types of a client:

a) **Thin client**:

Thin client are those which predominantly relies on server, and does little to no processing at client side
For ex: paytm, it does all its transactions over the backend and simply shows transaction successful in frontend.


b) **Thick client**:

Thick clients are those which predominantly relies little to no on server and does most heavy computation
at client side only ex: games like call of duty.


**Two tier architecture:**

So we have a server and consider we have a single server. A server can do multiple things like say
perform logical operation on data, store the data , manages web traffic, serves files , serves media etc.

So say in our initial development of gfg we have a single server which does all these things and we have thin client.

Client sends the request and receives web pages/HTML which client render simply, server also stores data, does logical
operations and even does web traffic management.

Now question arises how does a single server is able to perform all these task. So a server is hosted on a IP say
47.35.98.10

a server has multiple ports generally 2^16 ports.

Every port has some specific port number so consider this server of our does

logical operation on data at port 20 which means 47.35.98.10:20
data storing at port 30 which means 47.35.98.10:30
web traffic management at port 40 which means 47.35.98.10:40

Port are basically used to identify network service on a server.

Now in this architecture there is a problem, first if server crashes the application entirely will went down so
its prone to failure now suppose suddenly the traffic on the website increases and thus this single server will
become slow and will not be able to handle such loads. Therefore single server architecture is not reliable
for large traffic.

     Client ->  Server(1) [logical operation on data, store the data , manages web traffic, serves files , serves media etc]
      [mobile,
       web,
       desktop,
       Tv,
       watch]

Now comes the concept of three tier architecture


**3 tier architecture**

Now in two tier architecture we placed a database which will be responsible for storing data, whereas the server
will be responsible for performing logical operation and say handling other things like web traffic etc.

This two tier architecture can perform a little better but still is not the best as it will not be able to handle
greater load and again is prone to failure.

    Client -> Server(1)[Logical operation] ------> Database
    [mobile,
    web,
    desktop,
    Tv,'
    watch]

So there comes the concept of N tier architecture.


**N tier architecture**

In n tier achitecture we place a load balancer in between which is responsible for managing loads on say n number
of servers where every server has its own corresponding database or even a single common database.

    Client     ->    Load balancer    ----->      Server(1) ----> Database
    [mobile,
    web,                                          Server(2) ----> Database
    desktop,                               
    Tv,'                                          Server(3) ----> Database
    watch]
                                                  Server(n) ----> Database



                        [Client Requests]
                                ↓
                        🌐 Load Balancer
                         /      |      \
                  [Server 1] [Server 2] [Server 3] ... [Server N]





