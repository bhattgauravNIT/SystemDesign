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
                                [20,30]              [60,70]       [90]

8) now 40 comes in, its lesser than 50 at root moves left reaches node [20,30,40], m-1 rule not violated B tree looks like
                                             
                                             [50,80]
                                [20,30,40]              [60,70]       [90]

9)  45 comes in, it reaches node [20,30,40], m-1 will get violated, so node should have looked like [20,30,40,45], we need to split
   [20,30][40,45], via right bias 40 goes to root, root is [50,80] no m-1 is violated thus it can accommodate 40, B tree becomes

                                                [40,50,80]
                                [20,30]   [45]              [60,70]       [90]



10) 15 comes in, reaches last node [20,30], it can accumulate 15, so B tree looks like
                                                  
                                                   [40,50,80]
                                [15,20,30]   [45]              [60,70]       [90]

 11) 25 comes in, reaches node [15,20,30], it cant accumulate it as m-1 is violated, if it was not violated the node would be
     [15,20,25,30] so we need to split it, [15,20][25,30], by right bias tale 25 in root, now root is [40,50,80] but it can't
     accumulate 25 as m-1 key rule will get violated in root now thus if root no rule was violated it would be [25,40,50,80]
     split it [25,40][50,80] by right bias make 50 as root so B tree would look like

                                                     [50]
                                    [25,40]                          [80]
                            [15,20]   [30]   [45]               [60,70]   [90]


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
                                    [25,40]                                       [80]
                            [15,20] ->  [25,30] ->  [40,45]     ->       [50,60,70] ->  [80,90]

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