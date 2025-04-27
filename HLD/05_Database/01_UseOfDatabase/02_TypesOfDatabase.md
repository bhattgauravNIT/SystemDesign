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

