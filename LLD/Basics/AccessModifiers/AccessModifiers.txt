There are 4 access modifiers namely

1. Default
2. Private
3. Public
4. Protected

Say ex:


1. public class A {
     int name;
}

Since we have not mentioned anything its by default a default access modifier and it can be accessed in the same package.
So all the files (java files) which are in the same package can have access to this name once they create an object of class A via importing
class A from the same package.


2. Private

public class A {
    private name;
}

Now this private variable will only have access in the same class rest no where. Not even inside the java files or classes present
within the same package.

3. Public 

public class A {
    public name;
}

This public variable will have access everywhere that is even from other packages.So simply if we import class A from say a package 1
into some other package say P2 which is having a class from where we wish to access this, thus we simply create a object of class A 
and access it.

4. Protected

public class A{
    protected name;
}

Same Package: Any class within the same package can access the protected members of another class.
Subclasses: Any subclass, whether in the same package or in a different package, can access the protected members of its superclass.
