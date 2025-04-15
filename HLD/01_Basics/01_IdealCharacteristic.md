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