A constructor is a method only which is named after class itself and it gets called everytime a new object is being created.
So suppose n new objects gets created so the constructor will also gets called n number of times.

Even if we explicitly dont create a constructor in our class java create a constructor by deafult for us and its 
default constructor which looks like say:

public Employee() {}


Lets take an example:

class Employee {
    int empId;
    String name;

    public Employee(int empId, String name) {
        this.empId = empId;
        this.name = name;
    }

    public int getEmpId() {
        return this.empId;
    }

    public String getName() {
        return this.name;
    }
}


Here Employee method of Employee class is a parametrized constructor as it accepts parameteres and thus assign the values to the instance
/object's instance varibales in the heap.

We also can have a non parametrized constructor which may be we can use to set some default values to the instance
/object's instance varibales in the heap.

class Employee {
    int empId;
    String name;

    public Employee() {
        this.empId = 99999;
        this.name = "Ponga";
    }

    public int getEmpId() {
        return this.empId;
    }

    public String getName() {
        return this.name;
    }
}

Similar to the concept of method overloading we can also use constructor overloading in which we have two or more constructor in the same
class but which accept different arguments. Ex: 

class Employee {
    int empId;
    String name;

     public Employee(int empId, String name) {
        this.empId = empId;
        this.name = name;
    }

    public Employee() {
        this.empId = 99999;
        this.name = "Ponga";
    }

    public int getEmpId() {
        return this.empId;
    }

    public String getName() {
        return this.name;
    }
}

So if we create a object

Employee emp1 = new Employee();  the empId and name will get set to the default values
Employee emp2 = new Employee(1, "Gaurav"), the empId and name will get set to the given parameteres values.

