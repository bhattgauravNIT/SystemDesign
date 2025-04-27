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
