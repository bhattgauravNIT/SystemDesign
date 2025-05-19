**HLD**

Centralized systems are designed to operate on a single machine which limits their processing power,
storage capacity, and ability to handle large amounts of data and traffic. Therefore Distributed Systems are used.

A distributed system is a collection of independent computers (nodes) that work together to 
appear to users as a single, unified system. These nodes communicate over a network and coordinate to perform tasks.

For ex: netflix/youtube video streaming 

Once a video is uploaded they store it in origin server and then the video is replicated and store in edge server located 
around the world. Once a video is played the video is streamed from the nearest edge server.

Thus all these servers are interconnected via CDN or content delivery network.

For a distributed system reliability, maintainability and scalability are most important aspects.
Thus they are the key characteristic of it.

The term redundancy in system design refers having backup components or systems that can take over when the primary ones fail.
For ex; having multiple instances of micro service, than if one fails load gets balanced to other instance.

Let's understand the key characteristics of distributed system


1.**Reliability:**

A reliable system are those which are simply reliable or dependable. It means that the system
should continue to work even if something goes wrong. A system which can withstand faults, less prone to
failures and have proper fault tolerance system can be considered reliable.

Lets take an example of facebook system.

Facebook can be considered as reliable if it can withstand faults.

Lets understand faults, facebook is composed of multiple components however lets say one component goes down say
messaging service which helps in message functionality in our system then its a fault.

However if the entire system is down then its a failure, like say entire facebook is down for 2 hours.

Faults can happen due to three main reasons:

a) **Hardware fault:**

Say the server which was hosting our application was on bigData in some server room and than server room caught fire
then the hardware responsible for keeping our system running went down. Its an hypothetical scenario. Or say in youtube streaming
the nearest edge server got down due to faulty wires so streaming now is taking time so its a fault.

b) **Software fault:**

Say our system was designed in such a way that it leads to cascade faults i,e one fault in a component lead to
another fault in another component and so on thus the entire system went down. Or our system was not able to handle such load
thus it crashed or say buggy software.

c) **Human error**

Say we have a functionally in our application which ask the user to delete his account, then its a possibility that
the user clicked on it by mistake , thus in order to overcome such things we need additional checks like
say enter captcha and revalidate your account with user name or password before allowing him to delete.
So accidentally deleting important data, miscounfiguring network are possible reasons of human error.



2.**Scalability**


Scalability is also a key factor of distributed system or for any system. Scalability refers to the ability of the system
to handle increased load on it.

Lets understand the load parameters or the parameters which proportionate to load.

**Web servers**: Throughput req/response time for an api call

The time taken to make a req and server respond to it is a kind of load parameter in case of web server.

**Database server**: Read/Write ratio

In cases of database what is the read to write ratio is also considered as a load parameter.

**Cache** Hit rates

In case of caching the hit rates i,e how many req is resolved by cache and how many are being directed to the main server
can also be considered as a load parameter.


Now question arises whats the best way to measure load or how load is measured.

We can consider taking average , mean, median or percentile approach. Out of all those percentile approach is best suited.

Lets understand the percentile approach.

Say i have req/response time for 5 api's i,e

api1: 50ms
api2: 100ms
api3: 75ms
api4: 2000ms
api5: 120ms

So if we sort them the time taken by various api's become

Sort the data in ascending order: 50, 75, 100, 120, 2000.
Determine the index: (90/100) x 5 = 4.5.
Round up to the next whole number: Index = 5.
The data point at index 5 is the largest value: 2000.
Therefore, the 90th percentile is 2000, meaning 90% of requests were completed within 2000 units of time or less.

Now lets understand one use case these api response time are for amazon feature which gives the users its order history.

In most of the scenarios everything is fine, but now consider a user with 100's of 1000's of order history and 
he is our premium customer as well.

Now if this case there can a lot of latency i,e delay between a request and start of a 
response.

Thus ideal measure needs to be taken care even for extreme use cases. In this scenario if the api uses some form of
pagination such that it shows 10 order per page and every time the user changes the pagination new page number goes
and it gives us next 10 records than there can never arise a problem in which 100's of 1000's of record has to be fetched
in a single response .

Moreover in general In order to reduce latency micro services should not communicate with other service synchronously, i,e 
say I have a order microservice and a inventory microservice so once order micro service gets called, it should not
be dependent upon the inventory microservice to search wether the product is available then respond back to order service
while mean time order service keeps on waiting. This increase latency in our architecture.

There are ways to handle such situations which we will explore further.

3. **Maintainability:**

By maintainability means we should be able to maintain our system. It refers to the ease with which the system can be maintained and updated over time

Like taking a system into maintenance phase.

In which we provide entire automation to the system, fix all bugs in the system , address technical debts in the system, converting
legacy code, if new feature comes we add it.

Code review helps in maintainability of system as tech debts can be identified.



<---------------------------------------------------------------------------------------->

**Zero To Infinity**




**Client server architecture**

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

    



        [Client Requests]
                ↓
        🌐 Load Balancer
         /      |      \
    [Server 1] [Server 2] [Server 3] ... [Ser N]




**DNS Resolver**

Now lets understand domain name server (DNS) which is a server.

So previously our client was sending a request to a server and a server was sending back the response.
Lets suppose the client wants to interact with a server.

So the client say hits the server like

http://geeksForGeeks.org

Now the server is hosted and is uniquely identified by an IP so say the server is running on an IP
142.136.92.42 

So ideally in order for the client to communicate with the server it has to hit something like

http://142.136.92.42


So the request which client sends like http://geeksForGeeks.org is user friendly whereas the 
http://142.136.92.42:20 is device friendly as devices communicate over IP.


So its the responsibility of the DNS or domain name server which holds a mapping of domain names with corresponding
IP address corresponding to that domain.

So once a client make a request say via http://geeksForGeeks.org with domain name geeksForGeeks.org it 
reverts back with the resolved IP of that domain and thus the client will be able to communicate with the server.



        http://geeksForGeeks.org
Client    -------------->DNS
          <-----------
           http://142.136.92.42:20 
      --------------------------------Server                                 
          http://142.136.92.42:20


Lets understand the architecture of DNS server. DNS acts as a phone book for internet.
Suppose we have a library and library has a lot of books now all these records are managed via a register which
has the book name and the corresponding shelf number where the book is placed.

This type of system seems simple but its difficult to maintain and has high latency.

Problems with having such system:

a) When a user is finding the book through register, the resource i,e register is locked
and no other user can find his book till be release the register.

b) The book will be huge as there can be n number of books in the library thus searching and going through each
entry in register is not effective and costly operation.

c) Adding a new entry or updating an existing entry or deleting an entry is also time consuming .

Thus such system is not feasible or viable so in case we are thinking to design the DNS server in the same manner
than its a bad idea.

How ever if we can think of something where one level has info that books from say alphabet A-E are present 
in Shelf 1, E->I are in shelf 2.

Now shelves contains info that AA->AE are present in row 1 similarly so on, such type of arrangement will be more effective.


Now lets understand the architecture of DNS. 

A domain name say blob.geeksForGeeks.org can be subdivide into three components if seen from right to left

org can be considered in TLD i,e top level domain
geeksForGeeks can be considered as actual domain
blogs are subdomain

so say we have www.google.com

com -> TLD (top level domain)

google -> actual domain

www -> subDomain

So its basically a tree structure where (.) is considered as root, 

                             .

                    |                  |                  |
                    org               com               net        --------> TLD(top level domain)
            |         |             |     |            |
            gfg      wiki        google   amazon    php            -------------> Actual domain
        |                         |
        blob                     www                               -------------> Sub domain


Now lets understand the flow how DNS architecture works:

So suppose a client wants to access the domain blob.geeksForGeeks.org. The process works as follows:

Client's browser first checks its local DNS cache to see if it already has the IP address for the domain.

If the entry is not cached, the browser forwards the request to the system's DNS resolver (usually the one configured by the OS,
which contacts a recursive resolver).

The recursive resolver (often provided by your ISP or a public DNS provider) acts as a middleman between the client and the 
DNS infrastructure. It is responsible for resolving the domain name into an IP address by contacting various DNS servers.

The resolver starts the DNS resolution process by querying a root DNS server:

It asks: “Who is the TLD server for .org?”

The root server responds with a referral to the TLD name server responsible for .org.

The resolver then queries the TLD server for .org, asking:

“Where can I find the authoritative DNS server for geeksForGeeks.org?”

The TLD server replies with the address of the authoritative name server for the domain.

The resolver then queries the authoritative DNS server:

“What is the IP address for blob.geeksForGeeks.org?”

The authoritative server responds with the actual IP address of the subdomain.

The resolver caches the result (for the duration of the TTL (time to live)) and returns the IP address to the client.

Finally, the client uses the IP address to establish a connection to the server hosting blob.geeksForGeeks.org.

See diagram : ![alt text](Diagram/DNS_RESOLVER_FLOW.png)

Client ------> 

So if we try n understand this with the hierarchial tree that we saw above

                                      .                                -> Root server

                    |                  |                  |
                    org               com               net       --------> TLD(server)
            |         |             |     |            |
            gfg      wiki        google   amazon    php        -------------> Authoritative server
        |                         |
        blob                     www                                         


The resolver ask the root i,e the root server that where is org- i,e the Root server sends back reference of 
TLD server of org.

Now Resolver ask the TLD server that where is gfg.org so it sends back an Authoritative server

Now resolver ask the Authoritative server where is blob.gfg.org so it sends back an IP to resolver, we can say that
leaf contains the IP and its just like searching for a path in tree where the leaf node at end of the path will
give an IP to resolver.


This IP is being cached and send back to client which uses it to communicate with server.

DNS server also has load balancing suppose one domain name maps to multiple ip's i,e the system have multiple servers
through which it can operate and thus DNS servers provide load balancing to distribute traffic to these different servers.



                          **DNS diagram here**




**DNS caching**

Now every time the client makes a request its not a great idea to always ask the local resolver(Present in Os)
to connect to recursive resolver (present in ISP'S infra or public DNS provider) to connect with DNS servers
and resolve the domain name.

So in order to overcome this lookup every time the client makes a request, there is a concept of DNS caching.

These caches can be stored in multiple layers like

a) Clients browser
b) Os
c) ISP’s DNS resolver or any public resolver (like Google DNS) caches results for many users.

These caches can be stored for a TTL (time to live) after that these cache are expired or removed.

Now these DNS cache can have many type of NS(name server) records 

1) A -> Stores IPV4 address for named domains
2) AAAA -> Stores IPV6 address for named domains
3) CNAME -> connanical name like www.google.com and google.com are same
4) MX( mail exchange ) record -> Specifies the email server responsible for receiving email corresponding to a domain
5) NX record -> Specifies the authoritative server corresponding to a domain name
6) Text record -> Stores text data corresponding to a domain name.


If the user clears the cache of his browser then before the TTL even these DNS cache can get removed.

In order to see DNS browser cache we can go to chrome://net-internals/#dns and
input the domains for which we need to see IP's for.


We can see cache in network (developers tool)

app.js       58 KB     (from disk cache)
style.css    30 KB     (from memory cache)
logo.png     12 KB     12 KB


from disk cache means it was cached in our hard disk/ssd
from memory means it was cached in our RAM
logo.png is freshly downloaded.


Amazon cloud's Route 53 is a DNS web service provider hosted on cloud which can help creating host zones i,e
zones where we can map our domain with some IP'S of different types of Named servers like A, AAAA etc.




<------------------------------------------------------------>

**OSI Model (Open system interconnection model)**



OSI model (Open system interconnection model) is a theoretical framework which is used to standardize how
different networking system communicates with each other. It divides the communication into 7 different layers where each layer has its own functionally.


1) **Application layer(Layer Number: 7)**

It is closest to the user and top most layer in OSI model. Its the place where the user interact with the
network via some interface, browser etc. So the user wants to connect to www.google.com and thus he interacted
with browser to do so, so browser is our application layer.

And at application layer the browser interacts with the web server.

The protocol that can be used is HTTP or HTTPS.


2) **Presentation layer (Layer Number: 6)**

Presentation layer is like a translator which ensures that the data sent by application layer of one
system can be understood by application layer of another system.

Lets suppose we are trying to access a secure website through HTTPS, and we want to say
search for google, so the request which we may be sending or may be the response coming back from the server
will be encrypted in presentation layer

HTTPS = HTTP + (SSL/TLS)

i,e HTTPS = HTTP + (Secure socket layer/Transport layer security),

This encrypted data will then be decrypted at the receivers side or the server side.


3) **Session Layer (Layer number 5)**

A session layer is responsible for starting, managing and ending communication session between the browser
and the server.


4) **Transport Layer (Layer 4)**

The data or the request can be huge (in form of (0's & 1's) so its the responsibility of the transport layer to convert this large chunk of data into smaller pieces called segments in case of (TCP) and data grams in case of UDP and make them reach in sequence for the user.
The port number for sender as well as receiver are assigned in this layer.

TCP and UDP are two protocols associated with transport layer 

TCP: Transmission control protocol is little slow compared to UDP but reliable , guarantees delivery and order

UDP: User data gram protocol is fast, un reliable, no guarantee of delivery and no order, its generally
used for streaming.

The role of assigning port to these segments is to help in identification of service/application.


5) **Network layer (Layer3)**

Consider network layer as GPS or navigator which helps packets find its destination.
The transport layer has converted all large chunk of data into small segment, network layer assign these
segments with some IP address for source and destination, basically it uses IP protocol to convert these segments of data
into packets and sent into the network with routing instructions.
Network layer helps packets reach the destination via best possible route.

The role of assigning IP is to help identify the device in the network.

6) **Data link layer (Layer2)**

The IP packets now coming via network layer are now wrapped into frames and sent to your local network (router or modem).
Network layer is responsible for assigning frame which includes the Mac address of your device,
mac address of the next hop and error checking happens.


7) **Physical Layer (Layer 1)**

Finally, the actual electrical signals or light pulses are sent through your Wi-Fi or Ethernet cable.


**Lets understand the entire e-e flow by taking an example:**

-7: I opened my browser and hit https://google.com, the browser initiates a request using HTTPS specifically ,
it needs the IP address of google.com and thus started DNS lookup. This all happened in Application layer.

-6: Now the browser has to send the data i,e request so it encrypts it via (TLS/SSL) since its HTTPS, compress the data ad sent it. It all has happened in presentation layer.

-5: Now there is a secure connection which is being made with google servers using TLS handshake,
this sessions is managed and maintained, This all happened in session layer.

-4: Now the request data which needed to be sent (ideally in 0's & 1's till this point of time) to server is broken down into small segments, uses TCP in this case to maintain safe, reliable and sequential data flow. A port number is assigned both of the source and the destination. This all happened in transport layer.

-3: Now these small segments are wrapped into a packet, an IP address is assigned for both source and destination.
Uses IP to find the best possible path for packets to reach destination, routers inspect and forward the packet
on assigned paths. This all happened in Network layer.

-2: Now this outgoing packet (with TCP+ IP address) is wrapped in a frame which includes the Mac address of your device,
mac address of the next hop and error checking happens. This frame is now sent over the network using local medium
like wifi. When the frame reaches your router the router checks the destination MAC. If the destination IP is outside
your local network (which Google is), the router Removes the old frame and Creates a new frame with Source MAC = router's MAC, 
Destination MAC = next hop (like another router or modem) and forwards the packet along the path to Google. this all happens in Data link layer

-1: Now the raw bits (1s and 0s) as electrical signals, light, or radio waves travels through cables or Wi-Fi through switches, routers, fiber optics, etc., to reach Google.


Note: encapsulation is when data is flowing from L7 i,e application layer -> L1 layer i,e physical layer seen in case of
request sent from client to server 

A situation of de encapsulation is when data is flowing from physical layer to application layer.



<---------------------------------------------------------->

**Load balancer**

A load balancer is used to route traffic to different number of servers in a cluster.

Say we have multiple clients and multiple servers, so instead of routing all the load/traffic to a single
server , the traffic should be distributed equally and uniformly across all the servers and thus its the responsibility of the load balancer to help in doing so.


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



**Scaling load balancer**

Every system has some limits like the max RAM it has, CPU computation etc. Consider a scenario in which our load balancer
is capable of handling 10k req/sec. However now our application has scaled and now we wish our load balancer to support
15k req/sec. How this can be achieved is what comes under scaling load balancer.

Suppose this below is the current scenario.

Client 1   ---------------

                                                                    server1
Client 2 --------------
 
                                                    (10k req/sec)     server2
Client 3 ----------------     Load Balancer ------------
 
                                                                    server3
Client 4 ---------------


Client 5 --------------------


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
DNS resolves that request which will hit our server 2, a type DNS record, two because we have two load balancer, so suppose our load balancer1 has ip IP1 and load balancer 2 has ip IP2 so the DNS record which will be there after DNS resolution of the request will be

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



Client 1   -------------------------------         Registry
 
                                                     |                                server1
Client 2 ---------------------------------           |
  
                                                     |                                server2
Client 3 ---------------------------------      Load Balancer1
 
                                                                                      server3
Client 4 ---------------------------------      
   
                                                Load balancer2
Client 5 -----------------------------------


One example for such registry is ZooKeeper.



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



<--------------------------------------------------------------------------->

**Scaling in system design**

Scaling refers to the capability of our system to be able to cope up with increased load or traffic.

Suppose at initial time our system is designed to handle 10k req/sec but now say over changed business requirements or even 
with enhancement in business over the years, the system now needs to handle 15k request/sec so our system should be capable enough
to scale up. This is the concept of scaling.


**Types of scaling**

There are basically two types of scaling:

a) Vertical scaling
b) Horizontal scaling


**Vertical scaling**

Lets consider a scenario in which we have a single server having configuration like 2virtual CPU, 16 GB RAM and TB transfer memory.
Now with time our application expanded so we need to vertically scale our system. Now in vertical scaling we will be adding more
configuration to this server only. So previously it was 2vcpu, 16GB Ram and 1TB transfer memory. Now we can scale it to
2 vpcu, 32 GB ram and 2TB transfer memory.


Such type of scaling is known as vertical scaling.

Vertical scaling is possible upto a certain extent only because let us suppose our server is a physical device so there are some
physical limitation of the server upto which it can be scaled.

Vertical scaling cost is also non liner/non uniform because lets say

1vcpu, 16GB RAM, 1TB transfer memory is costing us 100$
then maybe 1vcpu, 32 GB RAM and 2 TB transfer memory can cost us less that 100$

Vertical scaling is performed on a server and thus breed to single point of failure, if this server crashes our application can
went down.


**Horizontal scaling**

Again consider the same scenario in which we have single server having configuration like 2virtual CPU, 16 GB RAM and TB transfer memory.
Now with time our application expanded so we need to horizontally scale our system.

Now instead of increasing the configuration of an single server, we will simply add another server into our cluster,
i,e another node with 1vcpu, 16 GB RAM and 1 TB transfer memory.

The great thing about horizontal scaling is that it don't provide a single point of failure as load balancers can help in
health checks of the nodes and can route the traffic accordingly.

Moreover horizontal scaling is cost uniform as say one node with 1vcpu, 16 GB RAM and 1 TB transfer memory was costing me 100$
so another node also will cost me approx same.

Ideally there is no limit to upto what point we can scale in horizontal scaling however the complexity of the system increases.


**Mind map:**

The mind map to remember vertical and horizontal scaling can be if we want to accommodate people in a city, we can build a building
and start accommodating them, now more people comes in so we need more floors and then more floor. But there is a certain limitation 
upto which we can build floors on top of each other . This is vertical scaling

Thus another way to scale is to start creating more buildings parallel to accommodate more people. This is horizontal scaling.


**Which scaling to prefer**


Initially its always better to go with virtual scaling but however after a certain point of load horizontal scaling is proffered
Its because of cost effectiveness and lets say initially I was capable of handling 10k req/ sec and was working fine, now immediately
I don't need to handle 18k req/sec but say on 12k req/sec for next 10 years then why would i be in cooperating horizontal scaling
to increase my server limits to support 20k req/sec at current time since it will increase my operation cost for next 10 years
even though I don't need it.

So initially if req are increasing gradually it better to do vertical scaling but after a specif time horizontal scaling
become necessary.

How ever it also depends upon situation - situation, application-application and requirement-requirement.




<--------------------------------------------------------------------------->

**Database**


**Basics of Database**


A database can be considered as a single unit where application can store its data. Its a part of three tier architecture
where a client is connected to a load balancer, load balancer to cluster of servers and servers to one or many database.

In a database the data is stored in a disk and queries are performed to manipulate or read data from the disk.

Using Database can have it own advantages and disadvantages.

Advantages:

- Databases provide their own sense of security via authentication & authorization. SO data inside database is secured
- If there is no database then applications would have been storing their data on multiple different places and there would have been
a chance of data duplication but its not the case with database as we can control data duplication.
- We can create backup databases so that even if even database is down then still data is not lost.
- Database provide abstraction on how data is stored inside it and thus developer only need to interact with database rather
  than doing all complex stuff by themselves.


DisAdvantages:

- Although there is data security by security can be compromised and breached if administrator does not uses security features 
 properly.
- For large applications like amazon, flipkart we can have very large database and thus to query them we need machines with great
  computation powers and even very large memory is needed for these databases.
- Databases can add additional level of complexity and difficulty is one code base.



**Types of Database**

There are two types Database

1) Relational database/SQL database
2) Non relational database/NO SQL database


**Relational database/SQL database**

Relational database are also known as SQL database as SQL or structured query language is predominantly used to query these
types of databases. These database are generally very well structured and relations are the key highlights of this kind of database.
Suppose we have two tables users and accounts, then one user can have multiple bank accounts thus 1 user can be mapped to multiple
accounts and thus there is a 1->many relation between these tables , thus there exits a relation.

Data in SQL databases are stored in form of rows and column. However suppose we need to insert another column in a existing table or we need to change the
schema of even a table in a database then its a hectic task as either we need to provide that column value for all other rows as well or all these previous rows will have null value if null is permissible.

Each table in relational database has a column which has unique values throughout and can be considered as primary key.
Now suppose an another table (T2) has dependency over this table (T1) with a primary key column as C1, then this column will be used in T2 and
is known as foreign key.

So when one table's primary key is used in other table its a foreign key.

These types of database are ACID compliance.

Lets understand ACID:

**A -> Atomicity**

Lets understand atomicity with an example, I am sending 500 rupees from one bank account to another bank account , it means
in this transaction two things are happening first from my account 500 rupees are deducting , in receivers account 500 rupees
are going, say I have a user table which has a user id , bank account number and a bank balance.

Two rows needs to be updated in this transaction, say only one row is updated and update on second row failed may be due to n number of reasons, then this entire transaction is rolled back, i,e entire transaction no matter how many updates, delete, insert etc if considered
in one transaction then everything has to be completed for the entire transaction to be completed else the entire transaction is rolled back to original state.

**C -> Consistency**

The database goes from one consistent state to another consistent state, say we have some validation on some fields in database like
x field should be a number, y field should have a specific char length.

In an transaction if any field is found inconsistent or any constraint of the database is violated , then the entire transaction
is rolled back, so the database always maintains a consistent state.

**I ->  Isolation**

Isolation means that all transactions are run in an isolated environment, so that they won't interfere with each other and does
not lead to data inconsistency.

In databases there can be one problem of multiple concurrent transactions happening, this can lead to data inconsistencies
for other transactions thus Isolation is a database property that defines how multiple concurrent transactions interact with each
other leading to solve the problem of data inconsistency for transactions.

**Durability**

Once the transaction is committed then its permanent and will stay even if system crashes or say power outrage such that system went
offline.

Relational database are generally tabular i,e stored in form of rows and columns.

  Lets talk about storing some common data types in relational database.
          
  1) Storing time:

  a) DateTime format: SQL database can store time in DateTime format like 2025-04-22 14:35:00 but can cause issues with different time zones if not supported by the database.

  b) Epoch: Epoch time (or Unix time) is the number of seconds (or milliseconds) since January 1, 1970, 00:00:00 UTC, it can have a problem
    of overflow if not handled properly
  
  c) Number: Like 20250103 this is also a common way of storing Date time in sql database.


  2) Storing text

  a) varChar: varChar datatype is used to store text in sql database but it has a fixed length.

  b) Text: If a field is stored as a text in sql database then that field stores pointer to another place where this text is stored.
      In case suppose we need to specifically search for a keyword inside this entire text then its like two calls, one to find the column
      in the table where this text field is present and then using pointer value inside this cell to reach to actual text.

  c) Blob: The same concept of pointer being stored of another location happens also in case of blob. Generally when we need
     to store a file content or say small images as bytes.

  d) Json: The same concept of pointer being stored of another location happens also in case of json, but json data helps via proving
     key and values or say properties and values with the help of which any specific thing inside the text can be navigated.

     Some common example of Relational/SQL database are: MySQL , PostgreSQL, SQLite, Oracle database.


**OLTP vs OLAP:**

Database is a storage tool and systems are built on top of it. In general two types of systems can be build i,e OLTP or OLAP.

Lets say we buy something from amazon and we are a registered user, so what we bought along with our details are placed inside
the orders table of database. Now if i want to see my orders so in orders table all the orders corresponding to my user info
will be retrieved, so suppose in orders table there are n numbers of orders corresponding to different user, so few rows or may be
one row belongs to me , that row is retrieved and data is shown, this is a classic example of OLTP system i,e Online transaction processing where only few rows are concerned regarding the use case of the system.


Now consider a scenario in which a manager or system administrator wants to see total of all the value of the sales that happened.
Now this means iterating over every row and taking out values and then summing. This is a tedious task as database tables
can be very large and needs going over every row.

Such system are termed as OLAP i,e Online analytical processing.

There are some special database design for such kind of OLAP system which uses columnar approach.

Lets say we have a data which looks something like this

sale_id | product_name | quantity | total_price | customer_age | tax_amount
1       | T-shirt      | 2        | 39.98       | 25           | 2.50
2       | Shoes        | 1        | 49.99       | 30           | 3.00

for normal OLTP systems if we use normal database like say PostgreSQL or SQL then it stores data inside disk like

[1,T-Shirt,2,39.98,25,2.50] , [2,Shoes,1,49.99,30,3.00] i,e row wise. Now when need to query only few records this structure
is perfectly fine for a database, but however say a very large chunk of records has to be queried then this can take time.

Therefore for OLAP systems where enormous data has to be processed, databases are chosen which stores data on disk in columnar way

so for the same data which is shown above a columnar database will store it like

[1,2],[T-shirt,Shoes],[2,1],[39.98,49.99],[25,30],[2.50,3.00]

So now if all values corresponding to say quantity is needed is fast and straight forward.
Some examples of columnar database are Amazon Redshift which is relational database, Apache cassandra which is non relational database.


**Non relational database/NOSQL database**

Non relational database are also know as NOSQL database as SQL or structured query language is not predominant in them for data manipulation
or search from disc. In these database there is weak or no relation between the data. They are highly scalable.

There are many types of non relational database like

a) Key value type
b) Document type
c) Full text type
d) Graph type
e) Time series type
f) Immutable ledgers
g) Columnar


**Key value type**

These databases are specifically designed from the root to solve the problems/ use cases where we need to store the data as key-value
pair for ex consider use case in which we are creating an application in which we simply stores user session so key can be user-id and
value can be session id.

These are simple and no complex queries are needed to access data from them.

Ex: Redis, Dynamo DB.

**Document Type**

Document type non relational database are used for general purpose use cases and thus its jack of all traits but master of none. They generally
store data in form of json and thus can support complex queries.

Ex: Mongo Db

**Text search or full text type**

In applications we come across scenarios in which we need to search by some words and it gives results corresponding to it, even for ex
while searching say in youtube if we write a word which is relative or in context to what we mean to say the searches corresponding 
to that comes up. This happens due to Lucene library and some database are based on lucene library.

these databases makes such searches possible, so they have been specifically designed for text search.

Ex: Elastic search


**Graph type**

Consider a use case in which there exits a paradigm like say on facebook P1 is friend of P2 so P2 is also a friend of P1, P3 is friend
of both P1 & P2 so its now a mutual friend.

In these kind of scenarios graph type databases are used. So where we need to navigate to deep hierarchies graph type databases are used.
In graph database every element is stored as a node.

Ex: Neo4j


**Time series type**

Consider a use case where in a stock exchange we need to store the value of a stock at several times, so when each datapoint is
associated with a time stamp in such scenarios Time series type database is used and these database are
specifically designed for such scenarios.

A time series database has property of downscaling so lets suppose in stock exchange we are now not concerned about the value of stock
for a time stack which is 10 years old so such downscaling features are equipped in such database

Ex: Influx DB

**Immutable ledgers**

These type of database are used when a transaction once recorder can't be altered or modified. For ex: a successful payment record.
It ensures that the data once recorded has not been modified.

Ex: Hyper ledger fabric

**Columnar**

Columnar database as mentioned above are those which stores data in columnar way inside the disk so if we are building a OLAP type application
then columnar database can be used.

Ex: Apache cassandra


**Which database to choose:**

So in general, the choice of database dependents upon the use case if there is a specif use case like say text search then prefer 
specific use case database, if we know data that we will be storing has high dependency or the entities which we will be formulating are highly dependent on each other then relational database are good, if data is less relatable and general use case needs to be handled we can go for document non relational database like Mongo DB. If ACID is a key compliance for our use cases than also relational database should be preferred.

If we know that our database should be highly scalable then non relational database should be chosen.


**Replication**

Database replication refers to the concept of storing/maintaining multiple copies of our data in multiple
database nodes all connected via a same network in one Database cluster.



                                                DatabaseNode1

Client ----------------> Server -----------     DatabaseNode2
                      
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



**Ways of replication**

There are basically two different ways of replication, meaning replication can happen via two ways or two topologies
ie,

1) Leader Led replication
2) Leader Less replication


1) **Leader Led replication**

As the name suggest leader led so in the database cluster on node act as leader which will always take the
writes while others are followers. Mongo db, PostgreSQL, MySQL etc are databases which uses leader led replication.

Leader led replication can also be further divided into Leader follower and MultiLeader.

a) **Leader Follower**

Leader Follower replication as name suggests has a primary or a leader and then secondaries or slaves. So suppose in my database
cluster, I have in total 3 nodes , so one acts as a primary or master say P1, where other two nodes acts as secondary or slaves
say S1 and S2.


                            --------------------- S1 (database node)
           Server-----------             P1(database node)
                        ---------------------S2 (database node)

Now slaves will contains replica of master, and say we configure our system such that all write queries like insert, update, deletion
queries will be handled by primary and the slaves or secondary nodes will update replicas of the primary so that they are also
up to date and will server all kinds of read request.

Now lets understand the inner working that how these slaves will be able to catch up with the master node.

Say an insert, update or delete query is hosted by the primary node, so before sending acknowledgment to client it will
insert it into a replication log. These logs are inserted in a increment id say 1,2,3,4......

Now every replica or slave has a background thread working which is reading the logs and updating itself and keeping track of the updates
via this incremental ID, so say the replica log generated by primary at this point of time has 10 id's.

Now the s1 secondary started going through replica log and has updated itself till id 5. So it knows from where it need to start now
i,e ahead of 5. Same applies for other secondaries as well. Secondary periodically update primary about their catch up status.

**Benefits of replica logs**

1) These replication logs are generally kept static, lets suppose a insert query came in inside which the client said to insert
time stamp in time stamp column as current time. Now suppose P1 or master resolved this query and inserted time stamp T1 in its record.

Now instead of logging a static query in which the primary logged time stamp to be logged as T1 it inserted a
dynamic query which it received i,e insert time stamp in time stamp column as current time, then the secondary while replication
will insert their current time at which they executed this query and thus data inconsistency amongst the master and slaves will appear
and thus replica logs are kept static.

2) These replica logs can be used in Point in time recovery of the nodes.

Suppose we are allowing backup of our data at every 6 hours so consider the data being backed up at


12:00 AM---------------> 6:00 AM ---------------> 12:00PM

Suppose the database crashed at 8:00AM, so we have backed up data at 6:00 AM thus we can recover data till 6:00 AM , however
the database crashed at 8:00 AM thus till be need 2 hr recorder data and this recorder data can be found in replication logs.

3) These can be used in changed streams or changed data capture, lets suppose as soon as a new user register in our system we need to send him an welcome email or sms. Now there can be multiple ways of doing this but however one another simple way is as soon as a user will register so the primary user table will get updated and it will log it in replication logs. There can be another process running
when sees the replication logs and sees the user table updating with a new user can take care of sending this welcome email or sms.


Now there can arise a problem in which nodes fail. So there can two scenarios:

a) Secondary fails
b) Primary or master fails

If Secondary fails then its a simple problem of adding a new secondary:

Now lets understand how we can add a secondary or a master to a database cluster. 
We will simply take a snapshot of primary and an replication iD. We can get the replication id from the replication logs for the time stamp at
which we took snap shot of the primary. Now we will copy this snap shot to secondary, suppose it took
4 hours and in these 4 hours the primary may have changed by attending multiple queries and must had logged it in replication logs,
we had replication Id of the time at which primary snap shot was taken, so all replication ID's in replication logs after that
ID are new entries by primary and its where the data now differs between primary and new second. We connect new secondary into the
network and connect it with primary and it updates itself after that replication ID which it has stored.


However if a primary fails then this problem can be tackled via election.

**Election**

Say we have a database cluster with 1 primary P1 and two secondary S1 & S2. Now P1 has failed. All these nodes communicate with 
each other regarding the health and other things. Say S1 got to know that P1 has failed so every node has a replication ID associated
with them which states the current replication id by what they have cloned from primary through replication logs.

Now say replication id of primary is 10 as replication logs has total 10 entries, whereas replication ID of S1 is 9 and replication id
of S2 is 8. Now based on these replication id's since s1 is more nearer to primary and thus via voting s1 has 2/3 votes to be a primary
i,e one by s1 and one by s2 . Primary cant vote as its dead.

So by majority i,e elections S1 takes up primary role.

Note:

**Why we generally have odd number of nodes in a database cluster**

The two main reason behind having odd number of nodes in a database cluster is 
a) Cost effective
b) Greater fault tolerance.

Lets understand them suppose I have 2 clusters with 3 and 4 devices respectively

Cluster1: 3 nodes
                                   
     Primary
   |         |
   S1        S2


Cluster2: 4 nodes

    Primary
       |
       S1
    |      |
    S2     S3


Now lets fault tolerance in them one by one.

In cluster 1, if primary fails then S1 can have max votes as being primary via election is 2/3 (both S1&S2 voted for S1)
and S2 can also have max votes as being primary via election is (2/3) (both s1 & S2 voted for S2).

Lets talk about max votes which could exist in the system if primary was also up, there were 3 nodes, so majority is atleast 2
i,e if someone gets 2 or more than 2 then they win.

Now in case of P1 failure max votes s1 or s2 can get is 2 as explained which is greater than or equal to majority thus system can keep
running.

Now lets suppose than S1 also failed along with Primary so max votes with which S2 can become primary is 1 i,e vote of itself only which is not equal or greater than majority.

and thus if S1 and primary both fails the system can crash as S2 can't be a primary as it don't have majority votes thus 
in order to keep system running you can afford the loss of only one node and thus fault tolerance of this system is 1 only.

Now lets talk about cluster with 4 devices, clearly it has greater nodes and every node needs some CPU computation, RAM etc
which comes with code thus cluster 2 is more costlier than cluster 1.

Now if the system is up and running without any node failing, the total votes are 4.
At any time majority votes are greater than 2. Not 2 as it can lead to a tie.

Now say P1 fails:

S1 can have max 3 votes(vote of s2, s3 and itself)
S2 can have max 3 votes (vote of S1,S3 and itself)
S3 can have max 3 votes (vote of S1,S2 and itself)

Thus 3 is sufficient for majority and thus system can keep running.

Now if say P1 and S2 both fails now

S2 can have max 2 votes (S3 and itself)
S3 can have max 2 votes(S2 and itself)

2 votes are less than majority so no primary can be selected and in this case also the system can afford the loss
of only one node after that the system can't pick primary and crashes. So fault tolerance is still 1 only.

Thus an odd node system is better than even node system.

There are some problems associated with Leader Follower topology, since the secondary gets updated via replication logs
thus there can be a replication latency and suppose the write is performed by primary is not yet replicated by the slaves or
secondaries and a request came to query a user for its data, then it can lead to data abnormality.

Database like Mongo follow this, single leader and follower topology.


**b) Multi leader follower**

Now in case of multi leader follower there is no one primary rather we have multiple different primary.
These every primary can have their own secondaries. These primaries keep other primaries updated and thus
corresponding respective slaves belonging to those primaries will also be updated.

Consider some use cases:

Lets take an example suppose I have a global distributed system which has users in US as well as India.

Now we have created separate data centers say one in US and one in India.
Now US data center has its own database cluster with a primary and its secondary and similarly Indian data center also has
its own database cluster with primary and its secondary.

Both of them can operate independently and every user of US will be routed to US data center only whereas every Indian
user will be routed to Indian data center only. Now these master nodes present at both locations are inter connected to each other and is
responsible for keeping the data clusters synchronized to each other, then they send them updates and once updates reaches master they can be
then further taken to the slaves of individual data centers. 

Such type of arrangement is multi leader follower.

There can be problems with such arrangements:

1) Say a US citizen now traveled to India so while accessing the application from India the US person will be routed
   to US data centers only and thus there can be a little latency.

2) Suppose we want the masters or primary of each data center to be connected to each other so that they share updates
   of each other regularly so that both are in sync meaning Indian data center also has US data and US data center also has
   Indian data, so there can be a lot of latency in replication, moreover can however also gives rise to conflicts in data.

   Lets understand how conflict can happen with help of some example.

   So in this scenario our requirement is that both US data center and Indian data center are in sync to each other,
   A us person updated in profile so it got updated in US data center, before syncing of this info would have happened
   with Indian data center he somehow say through VPN connected to Indian database and updated his profile with some different
   info, now while syncing of these two databases, which data would be considered final and thus there is a conflict.

**Ways to solve conflicts**

There can be multiple ways to solve this conflict of data

a) Different routing of data like US data to US data center and Indian data to Indian data center without 
   syncing of these two clusters.

b) Last one wins:
   This approach is simple, every write is associated with a time stamp and the latest or last one goes through. However in this
   all datacenter should sync their clocks to UTC using a protocol like NTP (Network Time Protocol).

c) Auto merging:
    Classic example is github, if no specific one entry or file is being changed by more than 1 primary than simply do auto
    merge else ask for manual merge

d) Manual merge just like we do in git or any version control.

Another use case for multi leader follower can be:

Suppose we have made an arrangement that any user making change will be stored in his machine only i,e local database and 
then the global cluster can take updates from the local machine's database. Similarly with n users.

So every machine's local act as a primary and the global cluster is also a primary and these primary has to communicate 
with each other such that global gets in sync.

This can have a problem like if the client's machine goes offline than there is no way for global's cluster primary to 
get in sync however it can provide seamless experience to client as there will be little to no latency.



2) **Leader Less replication**

As in leader led replication, there is no leader present in this database cluster and all nodes are considered same. Cassandra uses this. Lets see how this works.
Suppose a client sends a request and in our database cluster we have 3 nodes. So there will be a coordinator, this can be within the database
cluster or even on server. Say its on server, now say a read query comes in , so server propagates this read query too all the nodes in database cluster
Now there exists a configuration which is handled by coordinator, this configuration has 

Read threshold -> R
Write threshold -> W

Read threshold means that in case of a read query how many different node should respond with data.
Write threshold means that in case of a write query how many different nodes should acknowledge it and updated themselves.

Say a read query comes in and we have 3 nodes in Database cluster (N) so if R(read threshold is considered 2) then if two nodes responded back than only
the coordinator will respond back to client with the result of query.

Say a write query comes in and if W( write threshold is set as 2) then only after 2 nodes are done updating the data then the coordinator will send
response OK to client.

This is called Quorum 
i,e read Threshold, write threshold and nodes such that W,R <= N

Now its very important to always maintain majority quorum. 

Majority quorum is W + R > N where (W,R =< N) i,e write threshold + read threshold > total number of nodes in cluster.

Lets understand why its important.
We have N=3, W=2 and R=2

So we have 3 nodes 


                       Node1                Node2               Node3
                       (k=2)               (k=1)                (k=2)

So a write request comes which write a value for k=2 in nodes. Since write threshold was 2 so the coordinator waited until 2 nodes updated itself
and then responded back the client. So say node 1 and node 3 successfully updated its value of k however node 2 still has outdated value.

Now our read threshold is 2. Now a read request comes in for value of k, since the read threshold is set to 2 so until 2 nodes responds back the coordinator will not respond back to the client, so which all 2 nodes can respond back node1,node2 or node1,node3 or node2,node3, in all the cases the updated value k will be sent
to coordinator and he will respond back to client with updated value.

Clearly via such arrangement we always ensure correctness in our queries and this we can ensure using majority quorum configuration i,e
W + R > N where (W,R =< N) is a majority Quorum.

Now but one problem still remains i,e Node 2 is still outdated and how can it be updated . So there are two ways to do it, i,e to maintain consistency
in all the nodes.

**a) Read repair:**

Now we saw that above the coordinator can receive an outdated value for node 2 in any of the read so it will know that node 2 is not updated and thus
simply it will issue an write query to node 2 to update its value with the updated value.

**b) Anti entropy process**

Anti entropy process is a background process which happens to keep updating data as it checks for differences and updates them.
Its best suited for data which is not read consistently and is prone to some latency as this updation takes time.



**Sharding**

Sharding refers to the concept in which a huge data is sharded across multiple nodes in a database cluster. Unlike in replication
where each node in a database cluster is a replica for the entire data, in case of sharding these nodes simply contains a sharded or
small component of the wholesome data.

Ex: Say I have 5 nodes in a database cluster and A->E is present in node1, F->M is present in node 2 and so on.

So its a way of dividing data across multiple nodes.

There are two types of sharding 

1) Fair/Uniform : In this type of sharding all the nodes contains almost equal data
2) Skewed: In this type , one or more nodes are hotspot i,e contains relatively very large amount of data as compared to other nodes.

**Advantages of sharding**

a) Parallel processing can happen say in case of an analytical system, we wish to do some computing so these shards can compute
and work independently.

b) It can overcome system limits, say for example we have a very large database and say one node which is hosting is can support 1TB, however
our data is 5B , so this 5tb data can be sharded over 5 nodes with each node having 1TB data.

c) Say we need backup/restore of large data, then it can be time ineffective, however in case of sharded database, each node can perform a
back up with some amount of data in parallel and once the restore request comes then, simply each sharded nodes can then start restoring
which can thus be gathered as a single unit from all sharded nodes into one.

**Disadvantages of sharding**

a) Increase operational cost as now data is sharded across multiple nodes and every nodes comes with cost.

b) In case of data having lot of relation amongst it, sharding becomes difficult and querying will also be difficult and complex due to
multiple joins.


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




**Database indexing**

Suppose we have a database or a node , now this node must be hosted on a machine. This machine will have a RAM and a disc
say an HDD or SSD. Now where data is stored in a database or a node is a disc. Whenever a query like read or retrieval comes in,
we are interacting with the disc in case of a cache miss because some data may be present in cache i,e RAM, so in case of cache miss
we need to interact with disc which is time consuming and costly, so why not to have a kind of data structure
in place on disc which will help us query fast from the disc itself.

How it works, if there is nothing which can save us some time during disc interaction in say searching of data in disc, then this thing needs to be searched throughout the disc and disc can be very large and thus we need a mechanism which will help in read queries.

So databases maintain some kind of data structure also called indexes in disc and some data of these disc in memory i,e RAM which help in finding exact location where the data that we need is exactly stored in disk, with the help of these indexes the read operation becomes fast for databases.

Lets consider example of such an indexes used by database say a hash table.

Now instead of diving inside the disc , the query goes to hash table first.

Say the exact data table to viewer looks like

UserID	       Name	            Email
1	           Alice	        alice@example.com
2	           Bob	            bob@example.com
3	           Charlie	        charlie@example.com

now consider that database created a hash indexes on email column 

So the indexes of database look like

hash("alice@example.com")   → Page 5, Row 1
hash("bob@example.com")     → Page 9, Row 4
hash("charlie@example.com") → Page 2, Row 7


this hash is a hash function like SHA, now a read query comes in for finding user by email, so this user input email
will be hashed, and be found in hash table , the corresponding location of the row will be found and returned in 0(1) time
this seems simple but there exists a problem with database indexes like hash table, as it don't support range queries
like say give me all rows between say id 1->10 if the database has hashed index id for maintaining this hash table, as hash destroys
the order in which it stores so we can't find the correct in between records for a range.

Moreover there are always chances of collisions.

So better database indexes/data structures has to be used like B Tree, B+ trees, Quad trees etc.

**Advantages of indexes**

a) The ideal indexes like B+tree store the helper data needed to find location in disc in sorted manner, so say if a query comes in,even to search through the Indexes of database we can simply use binary search which does the job in 0(logn)

b) Sort queries become very fast

c) Uniqueness in records can be managed via indexes only


**Disadvantages**

a) Whenever we want to write data, it has to be written both in disc as well as our indexes so write generally becomes 5% slower
in case our database use indexes.

In general if our use case is more read than write i,e the read/write ratio is very very large say 1000, i,e 1000 searches
for 1 read then indexes are helpful, however in a write dominant application indexes can be avoided.


**In depth of disc structure**

Every disc (magnetic discs) have tracks which are concentric circles on disc
            
Consider this diagram ![alt text](Disc.png)
as full circular disc so there are many tracks like outer purple circle , then inner yellow circle etc. These are all tracks

Now consider an arc on the disc like the blue arc, this is known as a sector.

The area of intersection between an sector and a track is called as a block (high lighted red section).

Now data is stored inside these blocks.

Lets consider an example that every block can store 512Bytes of data.

Say we have a user table and it has 100 records where every row takes 128bytes.

Now inside one block on the disc we can store (512/128) = 4 records only.

So in order to store the entire 100 records i,e (128*100 bytes) we need (12800/512) = 25 blocks.

Say now a read query comes in, which says give me student details with id = 1.

So entire 25 blocks has to be searched to get this data.

Say, instead of directly searching the disc we placed an indexes/data structure on disc which helps us with
info regarding data, say we created an hash table.

This hash table stores id of student record -> block id where record is present.

Now say id of student records is 8 byte and block id where record is placed is 4 bytes. So every entry in hash table is
12 bytes.

We have 100 records in total this means total entry on hash table will need (12 * 100) = 1200 bytes
Now every block can store 512 bytes , this means in order to store this 1200 bytes we need (1200/512) ~= 2.34 ~= 3 blocks

Now 3 blocks we need to store this hash and 1 block we need to go and get data from once a read query comes in
this means previously without indexes we have to go through 25 blocks to get the data,
now only 4 blocks to get the data.

This is significantly efficient but now consider a real scenario in which we have millions of records
now even this will not be so much fast, thus we need to use better indexes in this case than hash table.

If we can have multi-level indexes which also stores data in some sorted manner than it can drastically reduce the query
time.

From above we can see that total entry on hash table will need (12 * 100) = 1200 bytes
Every block can have 512bytes so we needed approx 3 block to save all this data.

Now this also means that every block can save around 400 records.

Lets understand this, say if our indexes was something like
                          
                        1 | 400 |  800 | 1200

            |1,2,3,4,5,..400|  |401,402.......| |............|

So if we need a record with id as 1, we saw in our indexes so 1 is lying between 1->400 so go left, we found block id corresponding
to id 1. 

So 2 blocks we needed for getting block id and 1 block for actual data on disc after getting block id.

This in case of huge number of records can save a lot of time, and this multi-level hierarchal data structure as indexes
are Btree/B+ tree which are the most common indexes in database.



**B/B+ Trees**

So since we have understood the importance for a hierarchial or multi-level indexes while database querying. Lets understand
B trees first. 

**B trees:**

B tree is an generalization idea for BST and M way search tree and is a self-balancing tree data structure and is balanced
meaning all leaves are at same level, this ensures that worst case search complexity always remains logarithmic.

B tree unlike BST can have more than 2 children as having only 2 children can lead to significant height of tree
which will eventually take up more disc space.

B tree of order m has following properties:

a) At most every node can have m child nodes
b) No node can have greater than m-1 keys
c) All leaf nodes should be at same level
d) keys in nodes are sorted and act as separation value for their children in case keys get greater than m-1.

Lets take an example and understand how B tree/indexes are formulated.

Say we have id's corresponding to users in database coming as:

20,30,50,60,70,80,90,40,45,15,25

Now we need to create a B tree of order m=4 say, every id will point to a block id in disc with help of which we will be able
to reach the block in disc where this data is stored.

1) Tree is empty → put [20] in root, [20] is a node which has a key, every key will have a id i,e 20 and reference to the disk where
   actual data corresponding to this id is being stored.

2) Tree node can have max m-1 keys i,e 3 keys conditions satisfied insert 30 in same node [20,30]
   
3) Similarly insert 50 key in same node, [20,30,50]
   
4) At max m-1 keys are allowed now when 60 comes, it will violate this so ideally it should have looked like [20,30,50,60]
   Now since m-1 keys rule is violated and thus separation needs to happen, we can split it like [20,30] [50,60], 
   now inner keys are generally considered for root in case of a split and if we choose left inner key its left bias and if we choose
   right inner key its right bias, thus lets go for right bias. So now B tree looks like

                                      [50]
                                [20,30]  [60]

5) 70 comes in, its greater than 50 , moves right reaches node [60], it can accommodate 70 so B tree looks like
                                     
                                        [50]
                                [20,30]       [60,70]

6) 80 comes in, it reaches node [60,70], it can accommodate 80 so b tree becomes

                                        [50]
                                [20,30]       [60,70,80]

7) 90 comes in, it reaches node [60,70,80], it cant accommodate 90 as it violates m-1 rule, now if the rule would not have violated
   the node looks like [60,70,80,90]. Here we need to split it [60,70][80,90] now based upon right bias 80 gets to root, root node
   can accommodate it as its only having [50] so b tree looks like

                                    [50,80]
                            [20,30]            [60,70]       [90]

8) now 40 comes in, its lesser than 50 at root moves left reaches node [20,30,40], m-1 rule not violated B tree looks like
                                             
                                        [50,80]
                            [20,30,40]            [60,70]      [90]

9)  45 comes in, it reaches node [20,30,40], m-1 will get violated, so node should have looked like [20,30,40,45], we need to split
   [20,30][40,45], via right bias 40 goes to root, root is [50,80] no m-1 is violated thus it can accommodate 40, B tree becomes

                                    [40,50,80]
                            [20,30]   [45]         [60,70]     [90]



10) 15 comes in, reaches last node [20,30], it can accumulate 15, so B tree looks like
                                                  
                                        [40,50,80]
                        [15,20,30]   [45]            [60,70]   [90]

 11) 25 comes in, reaches node [15,20,30], it cant accumulate it as m-1 is violated, if it was not violated the node would be
     [15,20,25,30] so we need to split it, [15,20][25,30], by right bias tale 25 in root, now root is [40,50,80] but it can't
     accumulate 25 as m-1 key rule will get violated in root now thus if root no rule was violated it would be [25,40,50,80]
     split it [25,40][50,80] by right bias make 50 as root so B tree would look like

                                                [50]
                                    [25,40]                   [80]
                        [15,20]   [30]   [45]          [60,70]   [90]


Clearly:

a) Its self balanced
b) All leafs are at same level
c) m-1 key rule is intact
d) all nodes can have max m child.


Now since data pointers are stored in all nodes in B trees and thus range queries like give data from 20->40 becomes slow
as we need some haphazard traversal in Btree to get it and its time consuming.


In order to solve this we use B+ tree, B+ tree is similar to B tree apart from few enhanced properties like all
data pointers are stored in leaf nodes and all non -leaf nodes contains pointers to its child nodes only and all the leaf 
nodes are connected via each other in form of linked list.

So in order to have all data pointers in leaf, leaf should have all nodes .

Thus The B+ tree for incoming data flow 
20,30,50,60,70,80,90,40,45,15,25 will look like

                                            [50]
                        [25,40]                       [80]
            [15,20] ->  [25,30] ->  [40,45] -> [50,60,70] ->  [80,90]

This structure solve issues with range queries.


Different databases allows the user to create index on a table's column like mongo db. 


Now there can be two types of indexes while considering indexing in DBMS

**a) Dense index:**

An index is considered as a Dense index if say we are creating an index on user_id column on users table and it have 1000 records
then all 1000 user_id entries will be present in indexes, i,e key of indexes as user_id and value as the location or id of block where
this data is stored, all of them will be present in indexes.

Although it uses more storage in disc as all records are present but also ensures faster searches.

It happens by default in mongo while creating a index.


**b) Sparse index**

An index is considered as a Sparse index if say we are creating an index on user_id column on users table and it have 1000 records
then not all 1000 user_id entries as keys will be present in indexes, say only first 100 user_id 's will be present.

Its memory saving and is helpful when only latest data is to be searched consistently. 

This has to be specifically mentioned while creating index for a table's column.



<------------------------------------------------------------------->


**Queueing mechanism**

Queueing mechanism refers to the concept in which two or more services can communicate to each other asynchronously.

Lets consider an example, when we send message on whatsapp it might be possible that the receivers
system is not connected to internet, thus the message might not delivered instantaneously, so what happens
we sent a request to server, it pushes it to queue, queue waits for acknowledgement from the receiver , once acknowledgement
receiver based upon the architecture might delete it from the queue. 

Lets understand a queueing system:

               msg                          msg
Publisher   ----------------> Broker    -------------> Subscriber

A publisher publishes a message/topic to a broker which acknowledges it, act as temp storage, once subscriber is ready sends it to
subscriber, subscriber after processing the message acknowledges to broker, which based upon requirement can either drop the message
or sends confirmation to publisher.

So broker is the service in between the publisher and the subscriber which is responsible for handling these
asynchronous request from the publisher to the subscriber.


Lets understand more scenarios where such system can be used.

Say i have an application in which i ask for signUp, here the user needs to provide the basic info about itself like
say username, password, email, address and a profile picture. Now once he saves his profile, the request goes
to the server. So the server as this point has to do a lot of jobs like storing info in DB, processing the profile 
picture as say it need to convert it to 30*30, even send an email to user welcome onboard etc.

This is a tedious job for the server and thus creating a profile can take forever. Thus suppose in our architecture
we have assigned different task to different services, like one service to store data to DB, one service to process the image,
one service to send email .

Now we generally see that email might takes few seconds to come after creating profile, it can be because the main service 
which the server sends request to after successful storing data in db, sends msg to a broker and this broker is connected
to say aws email service, thus these two services communicate with other other asynchronously.

Similarly the profile picture 30*30 processing say is handled by some other say a 3rd party service, again this queue/broker
helps in talking asynchronously.



Thus where ever two or services need to communicate to each other and we can afford asynchronous communication, then this
queueing system architecture can come into picture.


**Disadvantages**

Although the asynchronous communication can happen between two services which serves as advantage using this queueing system however,
there can be some disadvantages also which this.

a) Consider a scenario that publisher is very fash in publishing messages to the broker however the rate of consumption
or message processing is slow by the consumers. Thus since broker is a temp storage so it has some storage related limitations 
once it overflows then problems happens.

There are solutions to such problems.
1) Once over flow situation is reached, the broker can drop the messages, so if the business is okay with it, this behavior of broker
   can be adapted.
2) We can provide a larger buffer/resources to the broker so that it can queue up more data. It obviously adds up to the cost.
3) The broker can apply back pressure to the publishers, i,e once the broker has reached a threshold it can apply pressure back to
   publisher to lower the rate of message publishing or to even halt it for temporary basis, in order to provide the consumers time
   to process the message.

b) The broker crashes

Now in case the broker itself crashes then there is a possibility that the entire system can go down, in such scenarios similar
techniques like database replication can be taken into consideration like having many brokers, so if one went down load can be
transferred to other brokers.

c) Head of line blocking

Lets understand that at current T time, there are p1,p2,p3....pn packets in broker queue. Now pq is at front of queue and suppose
the consumers failed to process this packet which can happen due to n number of reasons. Now till it gets processed rest 
p2,p3.....pn packets will get stuck due to head of queue blocking the line.

This situation can be overcome by:
1) Proving a retry configuration at max number of limits, once that retry is reached the broker can either drop the packet/topic
   or can send it to dead letter queue. Dead letter queue contains corrupt packets/topics/request.


**Types of broker**

In general there are two type of brokers 

1) Queue brokers
2) Topics broker

**Queue broker:**

Suppose there are n number of publishers like p1,p2,p3,p4.....pn, at any current time in queue broker there are
n request like r1,r2,r3......rn and there are n consumers like c1,c2,c3.....cn. Now as soon as one request r1 is 
being handled or processed by a consumer c1 which it meant to relay to. So say publisher p1, is publishing messages r1,r3,r5 for consumer c1. So these messages can be consumed by c1 once it consumes r1, r1 is out of queue and so on.
This packet is considered resolved and will be out of queue.

So, each message in queue broker is relayed to only one consumer whom its intended for.

Ex: Rabbit MQ, SQS, queue in kafka.

**Topics brokers**

Suppose there are n number of publishers like p1,p2,p3,p4.....pn, at any current time in queue broker there are
n request like r1,r2,r3......rn and there are n consumers like c1,c2,c3.....cn. Now for a request r1, it will reach all the consumers
i,e c1,c2,c3.....cn then its taken out from the broker.

So reach message in topic broker reaches to all the consumers. Its like message broadcasting.

Ex: Mqtt Broker, SNS, topics in kafka


Note:

Once message is published and sent to broker and it acknowledges it keep it with it until no consumer subscribes to this broker.
Once the subscriber is attached, the broker send it to consumer based upon the type of broker either a queue or a topic broker.

These message are sent in flight to consumer, in case of queue broker if this message is not processed by consumer, it comes
back from message in flight back to queue. This can lead to head blocking problem for other other messages and thus the dead
letter queue needs to handle such things.



<--------------------------------------------------------------------------->

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

So overall When a request is first made, it triggers a database query—a process known as a cache miss.
The result is then saved in the cache before being returned to the user. On subsequent requests for the same data, the application checks the cache first to see if the data is available.
If it is, this is called a cache hit, and the result is quickly returned from the in-memory store.
In web application setup, we might use an application server cache and an in-memory store like Redis.


**Why cache is fast**

A simple question can pop up that why cache is fast. Cache performance depends upon where it is stored, what its storing and how
its accessed. Cache like Redis, Memcached stores data in RAM on local network which makes it way more faster.

The storing also is no complex data structure its like a simple key-> value pairs , these all things makes cache fast. 



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

So this cache is shared upon multiple applications on a single machine.



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



**Cache eviction policy**

Since cache is a temporary storage, and its fast but it comes at a cost, so we should always maintaining only required
data according to cache size limitation for optimized cost and performance.

Thus cache eviction policies are those which are used to debarred data or remove data from the cache.

There are many cache eviction policies some of most common are:

**1) Random replacement**

Random replacement as word suggest refers to policy in which once ram size is reached or set threshold is reached we remove
random data from the cache.

Consider an array being used to cache data, and max capacity that we need to hold is 10, now 
as soon as the size or length of this array, breaches this 10 threshold we pick up a random index and
remove it from the array. Then we insert the new data inside it.

We need to perform this insertion and deletion in 0(1) and thats what makes cache fast.
Moreover the cache should also not contain duplicates as this is not optimal use of resources.

So in order to achieve this with help of an array, we have a map and a array.

We store value and their index in array inside a map.
In case a value is already present in map we don't insert it in array and thus avoid duplicates in array for
optimum utilization of cache space.

Now in case the length of array is lesser than capacity then simply we push to array in 0(1) and update map.
Now in case the length is getting greater than the capacity it can hold, we need to pick a random index using
let randomIndex = Math.floor(Math.random() * capacity);

Now this random indexed value is swapped with last value of the array, and then this value is popped out in 0(1)
the map is updated with new index value for the last element which got swapped.

Lets consider its implementation:

```typescript
/**
 * 0(1),0(n) where n is capacity of Cache we are designing
 * 
 * Implementation idea is to randomly find any index from the cache array,
 * swap it with last element and pop it in case of capacity of cache is exceeded.
*/
class RandomReplacement<T> {
    private arr: T[];
    private capacity: number = 10;
    private mp: Map<T, number>;

    constructor() {
        this.arr = [];
        this.mp = new Map();
    }

    insertData(val: T) {
        if (this.mp.has(val)) return;
        if (this.arr.length > this.capacity) {
            let randomIndex = Math.floor(Math.random() * this.capacity);
            let temp = this.arr[randomIndex];
            this.arr[randomIndex] = this.arr[this.arr.length - 1];
            this.arr[this.arr.length - 1] = temp;
            this.arr.pop();
            this.mp.set(this.arr[randomIndex], randomIndex);   
        }
        this.arr.push(val);
        this.mp.set(val, this.arr.length - 1);
    }

    showCache() {
        return this.arr;
    }
}

let randomReplacementCache = new RandomReplacement<number>();
randomReplacementCache.insertData(1);
randomReplacementCache.insertData(2);
randomReplacementCache.insertData(3);
randomReplacementCache.insertData(4);
randomReplacementCache.insertData(5);
randomReplacementCache.insertData(6);
randomReplacementCache.insertData(7);
randomReplacementCache.insertData(8);
randomReplacementCache.insertData(9);
randomReplacementCache.insertData(10);

randomReplacementCache.insertData(-1);
randomReplacementCache.insertData(-2);

console.log(randomReplacementCache.showCache());
```

**2) Least frequently used (LFU)**

This cache eviction policy as name suggest removes the least frequently used cache entry from the system.
So once the size or threshold value is reached we remove the least frequently used entry.

however there can be a problem with this LFU, say a new data comes in and its used only once, i,e the time
where it came inside cache, so in the eviction of the data, its a potential candidate to get eliminated from the
cache. Thus even a new data can be removed from cache using this eviction policy.

```typescript
/**
 * 
 * 0(1),0(n) where n is capacity of Cache we are designing
 * 
 * The idea is to maintain two maps, one with value -> frequencies.
 * 
 * Another with frequency -> Set of values having that frequency, so to handle values with same
 * frequencies.
 * 
 * A min freq variable which gives the min frequency in map in 0(1).
 * 
 * Say insert(1), the capacity was 3, 
 * in freq map we have {1,1}
 * in key map we have {1, Set<>{1}}
 * minFreq = 1
 * 
 * insert(2)
 * in freq map we have {{1,1},{2,1}}
 * in key map we have {1, Set<>{1,2}}
 * minFreq = 1
 * 
 * insert 2
 * in freq map we have {{1,1},{2,2}}
 * in key map we have {{1, Set<>{1}},{2,Set<>{2}}}
 * minFreq = 1
 * 
 * insert 3, case of overflow
 * evict the Least frequently used val
 * 1 is used least frequently 
 * in freq map we have {{2,2}}
 * in key map we have {{2,Set<>{2}}}
 * minFreq = 1, but in next iteration automatically sets to 1 as any new entry will 
 * come.
 * 
 * 
 * 
 */
class LFU1<T> {
    private capacity: number;
    private freqMap: Map<T, number>;
    private keyMap: Map<number, Set<T>>;
    private minFreq: number;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.freqMap = new Map();
        this.keyMap = new Map();
        this.minFreq = 0;
    }

    insert(val: T) {
        /**if capacity is 0 then LFU cache does have allocated space thus return */
        if (this.capacity === 0) return;

        /**if freq map has val already present then we need call edit map */
        if (this.freqMap.has(val)) {
            this.editMaps(val);
            return;

            /**if freq map does not contain val this means its a new entry  */
        } else {

            /**if LFU cache is not having capacity then evict Least Frequently used val */
            if (this.freqMap.size >= this.capacity) {
                this.evict();

                /**If LFU cache has space then add this element both in freqMap and keyMap */
            } else {
                this.minFreq = 1;
                this.freqMap.set(val, 1);
                if (!this.keyMap.has(1)) {
                    this.keyMap.set(1, new Set<T>());
                }
                this.keyMap.get(1)!.add(val);
            }
        }
    }

    private editMaps(val: T) {
        /**
         * update the freqMap with updated frequency for the val already
         * present in map
         */
        const freq = this.freqMap.get(val)!;
        const newFreq = freq + 1;
        this.freqMap.set(val, newFreq);

        /**
         *
         * keyMap will always contains the old freq as we ensure this during
         * putting entry in freq map that an entry is made in key map.
         * 
         * Now delete this val from the set corresponding to that old freq.
         * There can be one corner case here that the set becomes empty corresponding
         * to that old frequency, that we remove that key even and set the minFreq as +1.
         * Say at this time 
         * 
         * keyFreq = Map{{1,1}}
         * keyMap = Map{1,<1>}
         * 
         * now we again insert1 so 
         * keyFreq = Map{{1,2}}
         * keyMap = Map{2,<1>}
         * 
         * so min freq has to be 2 now.
         * 
         * 
         * Now for the new Frequency, the keyMap can have set of values corresponding to it
         * or not.
         * 
         * If not we enter a new set corresponding to this new freq.
         * If its there we update the set.
         * 
         * 
        */
        const oldSet = this.keyMap.get(freq)!;
        oldSet.delete(val);
        if (oldSet.size === 0) {
            this.keyMap.delete(freq);
            if (this.minFreq === freq) {
                this.minFreq++;
            }
        }

        if (!this.keyMap.has(newFreq)) {
            this.keyMap.set(newFreq, new Set<T>());
        }
        this.keyMap.get(newFreq)!.add(val);
    }

    private evict() {
        /** We need to evict the Least frequently val, so we find the least frequent
         *  used frequency in keyMap
         * 
         *  Remove the first element from the set.
         *  In case we only had one element in set, and we removed that so
         *  we also remove the key itself.
         * 
         * we also remove this entry from freq map.
         * 
        */
        const set = this.keyMap.get(this.minFreq);
        if (set) {
            /**Gives iterator over set */
            const iterator = set.values();

            /** gives first value in set*/
            const firstInserted = iterator.next().value;
            set.delete(firstInserted);
            this.freqMap.delete(firstInserted);
            if (set.size === 0) {
                this.keyMap.delete(this.minFreq);
            }
        }
    };
}
```

**3) Least Recently used (LRU)**

This cache eviction policy is based upon the recent usage, in case the cache capacity is reached
and eviction needs to happen than the lest recently used data point will be removed from the cache.

Its implementation is based upon doubly linked list.
Least recently used means the data which is present at end of the doubly linked list and thus its 
removed in case of eviction when the capacity is reaching.

So lets understand this, suppose in my cache a data points comes in and say initially
the cache was empty so i inserted it as head, we marked its entry in a map of value -> node.
Doubly linked list looks like:

[{prev:null,data:1,next:null}]

Now a new data comes in say 2 it was not present in map previously,
so its the most recent data and thus it gets inserted as head and entry is marked in map.
Doubly linked list looks like:

[{prev:null,data:2,next:1}] -> [{prev:2,data:1,next:null}]

Now say again a data comes in 3, it was not present in map previously,
so its the most recent data and thus it gets inserted as head and entry is marked in map.
Doubly linked list looks like:

[{prev:null,data:3,next:2}] -> [{prev:3,data:2,next:1}] -> [{prev:2,data:1,next:null}]

Now say again 1 comes in, so its also in the map, now we cut the connection of this node and
the node can be found via the map, and insert a new node with value 1 at head as now its the
most recent, and update the end.
Doubly linked list looks like:

[{prev:null,data:1,next:3}] ->[{prev:1,data:3,next:2}] -> [{prev:3,data:2,next:null}]

Say again 1 comes in, so 1 is already the most recent and hence we do nothing.

Now say the the cache capacity is reached, thus we simply remove the end of the DLL
in 0(1) as we are maintaining a end node as well for DLL.

```typescript
/**
 * 0(1),0(n)
 */

/**
 * Node class which creates a simple node with 3 things
 * a previous, a next and the data.
*/
class ListNode<T> {
    private data: T;
    prev: ListNode<T> | null;
    next: ListNode<T> | null;

    constructor(val: T) {
        this.data = val;
        this.prev = null;
        this.next = null;
    }
}

/**
 * Doubly linked list of nodes which has a head and a end.
 * 
*/
class Dll<T> {
    head: ListNode<T> | null;
    end: ListNode<T> | null;

    constructor() {
        this.head = null;
        this.end = null;
    }
}

class LRU<T> {
    private mp: Map<T, ListNode<T>>;
    private capacity: number;
    private dll: Dll<T> | null;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.mp = new Map();
        this.dll = new Dll();
    }

    insert(value: T) {
        /** if capacity of cache is 0 return immediately */
        if (this.capacity === 0) return;

        /**if map already contains the value, it means we need to cut the 
         * connection of this node and create a new node and mark it as head
         * of dll.
         * 
         * a) The node whom we need to cut connection is already at head, don't do anything
         * as its already head.
         * 
         * b) If node which we are cutting connection of lies at end of dll i,e node.next === null
         *    then cut connection and update the end as end = node.prev and insert new node with this
         *    value at head.
         * 
         * c) If node which we are cutting connection lies inn between somewhere, end will remain same,
         *    cut its connection, mark a new node with the same value at head.
         */
        if (this.mp.has(value)) {
            let node = this.mp.get(value)!;
            if (this.dll && node !== this.dll.head) {
                if (node.next) {
                    node.next.prev = node.prev;
                }else {
                    this.dll.end = node.prev;
                }
                if (node.prev) {
                    node.prev.next = node.next;
                }
                if (this.dll.head?.next === null) {
                    this.dll.end = this.dll.head;
                }
                this.insertAsMostRecentNode(value);
            }
            
        } 
        /**
        * If its a fresh entry
        */
        else {
            /**
             * If the capacity is reached, remove the least recent used i,e from the end of the 
             * dll and update the end
             */
            if (this.mp.size >= this.capacity) {
                this.evict();
            } else {
                /** 
                 * The cache has capacity thus simply insert the value at head as its most
                 * recently used.
                 * **/
                this.insertAsMostRecentNode(value);
            }
        }
    }

    showCache() {
        return this.dll;
    }

    private insertAsMostRecentNode(value: T) {
        let node = new ListNode(value);
        /** 
         * if dll is empty i,e head is null simply make this node as head
        */
        if (this.dll?.head === null) {
            this.dll.head = node;
            this.dll.end = node;
        } else {
            /**
             * The dll already have a head, thus update this node at head.
             */
            this.insertAtHead(node);
        }
        /** Mark entry for the value corresponding to the node in hashmap*/
        this.mp.set(value, node);
    }

    private insertAtHead(node: ListNode<T>) {
        let temp: ListNode<T> | null = null;
        if (this.dll && this.dll.head) {
            temp = this.dll.head;
            node.next = temp;
            node.prev = null;
            temp.prev = node;
            this.dll.head = node;
        }
    }

    private evict() {
        /**Remove the end of the list and mark a new end as end = end.prev */
        if (this.dll?.end && this.dll.end.prev) {
            this.dll.end.prev.next = null;
            this.dll.end = this.dll.end.prev;
        }
    }
}
```

**4) MRU (Most recently used):**

This caching eviction technique is used to remove the most recently used data
in the cache. the general use case is lets say we are watching a youtube video so at this point
its the most recently used, now while showing recommendations, in case the recommendations is coming
from cache, then it wont show what we have just watched, thus removing the most recent used data point.

Its implementation is mostly same as LRU, however only once capacity is reached, eviction is different
as here we remove the most recent data i,e the head of the doubly linked list.

```typescript
/**
 * 0(1),0(n)
 */

/**
 * Node class which creates a simple node with 3 things
 * a previous, a next and the data.
*/
class ListNode<T> {
    private data: T;
    prev: ListNode<T> | null;
    next: ListNode<T> | null;

    constructor(val: T) {
        this.data = val;
        this.prev = null;
        this.next = null;
    }
}

/**
 * Doubly linked list of nodes which has a head and a end.
 * 
*/
class Dll<T> {
    head: ListNode<T> | null;
    end: ListNode<T> | null;

    constructor() {
        this.head = null;
        this.end = null;
    }
}

class MRU<T> {
    private mp: Map<T, ListNode<T>>;
    private capacity: number;
    private dll: Dll<T> | null;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.mp = new Map();
        this.dll = new Dll();
    }

    insert(value: T) {
        /** if capacity of cache is 0 return immediately */
        if (this.capacity === 0) return;

        /**
         * if map already contains the value, it means we need to cut the 
         * connection of this node and create a new node and mark it as head
         * of dll.
         * 
         * a) The node whom we need to cut connection is already at head, don't do anything
         * as its already head.
         * 
         * b) If node which we are cutting connection of lies at end of dll i,e node.next === null
         *    then cut connection and update the end as end = node.prev and insert new node with this
         *    value at head.
         * 
         * c) If node which we are cutting connection lies inn between somewhere, end will remain same,
         *    cut its connection, mark a new node with the same value at head.
         */
        if (this.mp.has(value)) {
            let node = this.mp.get(value)!;
            if (this.dll && node !== this.dll.head) {
                if (node.next) {
                    node.next.prev = node.prev;
                }else {
                    this.dll.end = node.prev;
                }
                if (node.prev) {
                    node.prev.next = node.next;
                }
                if (this.dll.head?.next === null) {
                    this.dll.end = this.dll.head;
                }
                this.insertAsMostRecentNode(value);
            }
            
        } 
        /**
        * If its a fresh entry
        */
        else {
            /**
             * If the capacity is reached, remove the least recent used i,e from the end of the 
             * dll and update the end
             */
            if (this.mp.size >= this.capacity) {
                this.evict();
            } else {
                /** 
                 * The cache has capacity thus simply insert the value at head as its most
                 * recently used.
                 * **/
                this.insertAsMostRecentNode(value);
            }
        }
    }

    showCache() {
        return this.dll;
    }

    private insertAsMostRecentNode(value: T) {
        let node = new ListNode(value);
        /** 
         * if dll is empty i,e head is null simply make this node as head
        */
        if (this.dll?.head === null) {
            this.dll.head = node;
            this.dll.end = node;
        } else {
            /**
             * The dll already have a head, thus update this node at head.
             */
            this.insertAtHead(node);
        }
        /** Mark entry for the value corresponding to the node in hashmap*/
        this.mp.set(value, node);
    }

    private insertAtHead(node: ListNode<T>) {
        let temp: ListNode<T> | null = null;
        if (this.dll && this.dll.head) {
            temp = this.dll.head;
            node.next = temp;
            node.prev = null;
            temp.prev = node;
            this.dll.head = node;
        }
    }

    private evict() {
        /**
         * Remove the head of the list,
         * 
         * if head is only node in dll, i,e head.next is null then remove head 
         * head = null.
         * 
         * if head has a next then mark that as head.
         * 
         * 
         */
        if (this.dll?.head) {
            if (this.dll.head.next === null) {
                this.dll.head = null;
            } else {
                let temp = this.dll.head.next;
                this.dll.head.next = null;
                this.dll.head = temp;
            }
        }
    }
}
```



<-------------------------------------------------------------->
**Security**


Security in terms of system design refers to the architectural tool which ensures our application to be safe
in prospective of data, resources, malicious attacks, authorized access.

There are some key components of security like

1) Authentication
2) Authorization
3) Encryption
4) Network security


**1) Authentication**

Authentication refers to verifying the identity of the user, in simple words its the process to get to know
that the user is actually whom its claiming to be.

Authentication can happen via several ways like

**Email/password or username/password based authentication**

The users puts in his email and password and its validated against the user say in some auth DB.

**Multi factor authentication**

Suppose after entering email and password, an OTP is sent to the registered mobile
number such scenario is considered as MFA or multi factor authentication.

**OAuth (Open authentication)**

Its allows application which the user is trying to enter, to get data of the user
from other service provider like say login in via gmail, here the password is not shared to the main application 
which is requesting data.

Consider an example, i opened an website like say cred it asked to how you want to login, i choose say gmail, now i am being redirected to gmail, i logged in inside gmail and now i gave consent to share my data with that app, gmail sends back an code
which is temp to the main app and i get redirected back to cred.

Now cred servers use this code to hit an post api to google called google token end point with the code.
Google sends back an auth token say a bearer auth token, now app request again google api's to get user info
via this token, the app gets the user info and lets him login in the system.

So Oauth works with token.

**SSO (Single sign on)**

Its an centralized authentication managed by IDP i,e identity provider like OKTA, so for example if you login inside gmail than you can
also simply access goggle sheets, docs etc without need to sign in again, as a centralized place checks your
identity and provides a token, when we enter other apps, it checks your token and allows you to sign in.

OAuth and SAML are two protocols which are used in SSO.


SSO with Oauth protocol:

It works exactly similar as explained above in O auth , if user say it wants to login via gmail them google which owns 
gmail acts as IDP i,e identity provider and send access token to the application which helps in authentication of the user.
Oauth works with token.


SSO with SAML protocol:

Suppose we work in a organization and we started our day, initially we are logged out, tried to access say tfs jupiter, 
it redirects us to an login which is an IDP(identity provider) login, it asks your username and password , now it authenticates 
you and send back a SAML assertion which is a XML based doc, to the tfs jupiter, it lets you in, now you don't need to
login again to any other apps like teams, outlooks etc as your identity will be verified via this SAML assertion as it is 
accepted by all the apps of your organization.  

So SAML works with digitally signed xml based doc.

**2) Authorization**

Authentication was simply confirming the identity of the user where as authorization refers to verify wether the user
is permitted to perform the action which its requesting for. Like in amazon if i m logged in as a customer than i m not
authorized to sell products.

Authorization can be role based or even attribute based like say type===customer etc.


**JWT (JSON Web token) based authentication & authorization**

As mentioned that OAUth works with tokens, so one of the most commonly used token in JSON web token also called as JWT token.
A typical JWT token looks like

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. 
eyJzdWIiOiIxMjM0NTY3ODkwIiwiboaWNoYSIsImlhdCI6MTUxNOTAyMn0.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

Its separated by 3 dots where each part before dot has some significance.

The first part i,e eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 is the header of the token which contains encrypted metadata regarding
the encryption algo which is being used like SHA256 etc, and the type of the token like say a JWT.

The second part is payload so eyJzdWIiOiIxMjM0NTY3ODkwIiwiboaWNoYSIsImlhdCI6MTUxNOTAyMn0 contains the encrypted
info about the user like username, issuing time, expiry time, role.  Role can be further used for authorization.

The third part is signature, and this is used to verify that this token is not altered and is issued by a trusted source.


Lets understand the flow, say the user submits its user name and password , it goes to server say server validates it with
authDb or some IDP like okta or google etc,
its verified and thus the server creates a JWT token,  now this JWT token is send back to client and is stored
in local storage or some secured cookies, now the user makes subsequent request to the server for some other services,
all these request and sended along with the token may be as a header, the server checks the expiration of the token, if token is valid and 
the user has the necessary role to perform that operation, the server responds back.  


**3) Encryption**

Encryption refers to the concept of encrypting data i,e converting plain text to cipher unreadable text.

The main difference between hashing and encryption is , say once we send a message so it gets sended as encrypted and then is decrypted
at other end, so that no malicious attack can happen over the network on it, whereas hashing means to convert th data for data integrity
example the password of a user is hashed and stored in db so that even db admin cant see the original password.

Moreover data encrypted can be decrypted back however data hashed can't be un hashed or resolved to original again. The same hashing
technique over the data would again give the same hash and thus can be validated with original data's hash.

Some hashing techniques are SHA-256 whereas encryption is AES, or SSL/TLS.

Encryption can happen over few stages:

**a) At rest:** 

Say we have a credit card dbms, so the credit card details which are at rest and stored in db can be encrypted so that even if the
database is compromised than even the data will not be compromised as its encrypted.

**b) In transit**

When the data is transferred over the network say from client to server or server to client its encrypted via say HTTPS using protocols
like TLS/SSL, this helps in data authenticity and secure communication.

**c) Field level**

In some field level encryption only some sensitive fields are encysted which may be crossing over network or even in rest state.



**4) Network security**

Network security is very important to make networks secure. Lets take a case that we are storing data inside cloud say AWS, now
if this network of AWS is not secure, say any IP comes and asks for data for its not like that this data will be provided and
moreover some restrictions on networks needs to be imposed to accept or reject which ip's or ports. This all comes under network
security.

**a) Firewall:**

Firewall can be used for network security, which permits or denies ip's looks for malicious attacks based upon pattern and acts
as a barrier between trusted and untrusted external networks.

**b) VPN:**

Say an employee is working away from office and is not in secure network, thus with help of Virtual private networks he
can access the company resources. So a request is sent to a service which authenticates this network and allows access to the main
network.

**c) Intrusion detection**

This helps detecting malicious activities based on patterns and past experience.


<---------------------------------------------------------------------------------------->

**Achitecture**

Systems can have different types of architecture like say a monolith, microservice or server less architecture. Each of these
architecture has there own merits and demerits. Lets see them one by one.

**Monolith architecture**

A monolith architecture is one in which all the modules lies in a single code base and are generally tightly coupled.
Say for example, we have zomato and we are designing it in a monolithic way so it can have various modules like say payment module,
user module, search module, delivery module, status module etc. All these modules will lie in a single code base and will be deployed 
as a single unit. Now if any change needs to be done say in delivery module for a new feature, the entire app needs to be deployed.

Testing becomes difficult as there will always be chances of one functionality breaking other as everything is tightly coupled.
Deployment is relatively easy as we deploy it as a single unit, however since its a single unit thus modernization becomes difficult
say for example single unit code base will all be in one language only, now say we know our delivery module is resource extensive 
and also it needs to work very fast, if all code base say is written in java, then we cant rewrite delivery module in go lang later on.

Moreover say entire application is a single unit and thus interacts with a code base say mysql, but however say our search module can become
pretty fast in case a different database is used in it like say elastic search, now this can't happen as application is itself a single
unit.

Sometimes, say there are high loads are its specific on say search, so since application as a whole is a single unit and thus
we don't have the leverage to scale up only search module, and thus the entire application needs to be scaled up.

Moreover in case deployment fails then there is always a chance of the entire application to come down rather than only few services.

**Micro service architecture**

A micro service architecture as name suggest, is a architecture in which different modules acts as different code bases and a separate service.
These are deployed independently.

Lets take an example of zomato over a micro service architecture.

So we can have different micro services inside zomato like payment service, order service, message service, user service, search service etc.
In this case if any service needs a different type of database then that service can independently use that particular database even.
These service as a single unit on their own and can be managed by different small teams. These services can be scaled up and down in terms
of resources accordingly and are independently deployable.

However there can arise some challenges with micro service architecture, sometimes, these services needs to communicate with each other
so a specific request, so say for a specific request data needs to be updated in two microservices like say order service and payment service.
Thus there can be a latency as inter service calls are happening moreover data inconsistency needs to be taken care of.

Moreover more cross team collaboration is needed in case of using micro service architecture as one changes in service can impact the other service too.

However its better as compared to monolithic architecture but still it depends upon use case to use case.


**Server less architecture**

Lets consider an example to understand serverless architecture. Say we are creating an application which will just authenticate and authorize the user and logs them in. Now instead of we creating a server which will store user info in userDB , it validates and then generate a JWT token and
then logs him in, we simply use a cloud provider say Amazon cognito, now its the responsibility of the cloud to handle, once user request for login, we will trigger a event to this cloud provider and it will do the job for us. Its on paid basis and gets scaled up as per number of
users by the provider, we don't need to do anything just pay more.

Some more examples can be image processing site, which stores user image in a s3 bucket and then when the user wants it back we just
have our logic to resize it and give him back. We don't want to handle the overhead of storing the images in form of pixels in our db and
just want someone to provide us this service, similarly can be done for messaging service.


