Just like we have talked about abstract classes i,e classes which have 0 or more abstract methods and we cant create
object of these classes.

Now coming to an example where every method is abstract then we can use an interface instead of an abstract class.

So an interface will have

1- All abstract methods: i,e methods only declared not defined and they will be public abstract by default
2- All instance varibales will be final and static

Since you can't create an object of interface so these instance varibales should never be object dependent and thus
they have to be static and final by default.

If a class implements an interface than it must define all the declared methods of that interface.

If a inteface extends another inteface than all the methods declared in that inteface will be by default marked as 
decalred also in the interface whhich is extending it.

A class can implement multiple interfaces.



So coming to the points of main difference between an abstarct class and interface is that :-

1. in case all methods needs to be abstarct then we use inteface else an abstarct class.

2. The class inherits an abstarct class but however implments an inteface.

3. If we need multiple inheritance then we use interface rather than a abstarct class because multiple
inheritance is not possible with classes.

4. Java interfaces can not be instantiated and thus all the member varibales inside a inteface can also be
static and final as they need not to be object dependent, however although abstarct classes also cant be instantiated
but still the member varibales need not to be static, final etc as The fields in the abstract class can be 
instance variables that each instance of the subclass can have different values for.




