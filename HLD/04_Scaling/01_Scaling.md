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


