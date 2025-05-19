**System design framework**

While approaching a system design interview, an interview should be structured with certain key steps
like requirement gathering, where we gather the requirements, then some back of the envelop estimates which
helps us in estimation on certain points for high level design and then details for high level design is considered.
Lets see them in detail.

**Template for Requirement gathering**

First we talk about requirements of the system i,e an bird eye over over view for the entire system is needed
or do we need to consider some specific components. If asked specif components then take it like that else
overall system is needed.

Template for Basic question we can ask while requirement gathering phase for any problem:

a) What is the scale of the application we are expecting, like how many users active per day, or say how many
users will be this application serving

b) What the expected growth rate of the application like yearly how many additional users are we expecting

c) What the latency we are expecting for avg response time

d) Is the application read centric or write centric i,e R/W ratio.

e) Whats the expected cache hit ration

f) Whats the number of request we will be serving per day on an average

g) Is the application global or whats the scope of users for the application

h) The system should focus on availability or consistency in data


Now lets take one example to consider situations here:

We have to design an IOT based car specific monitoring system which the end user can see stats for.

So some general requirement gathering questions should be asked.


**Step1: Requirement gathering**

1) Whats the number of active cars or cars which we need this monitoring system for say interviewer says 1M.
2) Whats the frequency rate by which the IOT should send data about car specifications say 10s.
3) The system should be availability based or data consistent based, so say availability based comes up
4) The system can show graph of the data to its end user.
5) The client is mobile or web both.
5) Geo location for the data should be local like India for now.


**Step2: Computations**

Now we need to do some computation for system performance estimates.

In general an L1(ns: nano seconds) < L2(ns: nano seconds) < Ram(us: micro seconds) < SSD(us: micro seconds) > Magnetic disc(ms: mili seconds) < Geo location network (ms: mili seconds)

Now active users are 1M and frequency of data sent by IOT is 10s

** QOS: 1M/10 = 10^6/10 = 10^5 = 100*10^3 = 100k req/sec, so our application is expecting 100K req/sec.

** Storage capacity: 

So lets consider basic data points here which we need for DB: 

id for a car: integer (4 bytes)

typePressureMonitoring attribute : string (8 bytes)
value: integer (4bytes)

engine temp attribute : string(8bytes)
value: integer (4 bytes)

oil level attribute: string (8bytes)
value: integer(4bytes)

~= 4*4 + 8*3 = 16 + 24 = 40bytes in one request ~= 50bytes

We are having 100k req/sec, so in sec with 100k request data coming is ~= 100k * 50 = 500k ~= 500*10^3 = 500kb.
500kb/sec data is coming meaning 500*10^3 = 5*10^5kb/sec = (5*10^6)/10 = 0.5MB/sec which is good as most applications can
support this but in case suppose this is very large say some gb/sec then a network conjunction can happen and thus we
may be needing to compress the data via some compression techniques. Like compress the data at source and then decompress
the data at sever.

10^3 = 1kb (kilo byte)
10^6 = 1MB (mega byte)
10^9 = 1GB (giga byte)
10^12 = 1TB (tera byte)
10^15 = 1PB (peta byte)

Now 500KB data is coming in 1 sec so in one year,

1 day has 24 hrs = 24 * 60 * 60 sec
1 year has has 400 days i,e 400 * 24 * 60 * 60 sec

so in one year ~= 500*10^3 * 400*24*60*60 data will come

for calculation lets consider some estimates:

5*10^5 * 400*30*60*60 ~= 5*10^5 * 500*10^5 ~= 25*10^5*10^7 = 125*10^12 = 125TB ~= 150TB of data

Now in one year 150TB of data is coming.

** Growth rate:

say 5-10% per year so consider 10 % per year increase.

i,e 15Tb increase in every year, on estimate i can say 15*5= 100Tb

so in 5 years total data storage is 150*5TB + 100Tb = 750Tb + 100 Tb = 1000 Tb = 1000 * 10^12 = 10^15 = 1Pb

so in 5 years we can have 1Pb of data.



Now since we are raising 100K req/sec thus load balancing and multiple server nodes are must and also
since this large data will be there so sharding of data should be done.

Now 

the system should be something like on high level:


IOT -----------------------------> load balancer --------------> Server(n)(service) --------------> DB(n) (sharded DB)
                       


Client -------------> load balancer ---------------> analytical service ------------------> Analytical DB


Now there can be two components for this application one component, is OLTP i,e Online transaction processing where the
IOT sends data to DB, another component is OLAP i,e online analysis processing, which is where the client will see the data.


**Step3: Detail design**

Now we have to ask interviewer, that are there any specific components which we should go in depth for, then question will 
come, go with the flow.

Question can come up that which database you will choose and why. How data will flow from DB to analytical db, then
how will you scale your load balancer how sharding will happen etc.


In design no design is perfect so if being asked, about flaws or shortcoming of your design

Some standard answers are:

1) Its suited for this QOS, these amount of users and this much storage.
2) Suggest small keys of design to better scale up.
3) Say its if local database, how can it be global etc.