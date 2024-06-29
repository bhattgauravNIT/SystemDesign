Lets take an example:

class Employee {

    private int empId;
    private String name;

    public Employee() {
    };

    public int getEmpId() {
        return empId;
    }

    public void setEmpId(int empId) {
        this.empId = empId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}

public class Encapsulation {
    public static void main(String[] args) {
        Employee emp = new Employee();
        emp.setEmpId(1);
        emp.setName("Gaurav");
        System.out.println(emp.getEmpId() + " " + emp.getName());
    }
}

So in emp class inside setEmpId and setName we are using this keyWord what does this signifies.

In the main we have created an object Employee emp = new Employee();
Then we want to set the empId thus we call it using the object itself emp.setEmpId(1);

Now this method
public void setEmpId(int empId) {
        this.empId = empId;
}

is having a local varibale empId and in the class there is a instance varibale empId. Now lest say we didn't use the (this keyword) in the
method so it would have looked like.
public void setEmpId(int empId) {
        empId = empId;
}

So eventually the empId for the object emp would not have been set to 1 which we are trying to do in main and it will remain as 0 only.
Why zero because as we created an object of class Employee, emp is the refernce varibale in the stack holding the address of the object
of class Employee getting created in heap.

In heap this object will be having instance varibales are methods.

Once we call emp.setEmpId(1), a new call stack for function setEmpId will get created and it will be having the local varibales.
Since in the function we are saying empId = empId; meaning we are trying to assign local varibale to itself, and thus this function call 
stack will have local varibale empId with value 1 however the value of instance varibale inside heap for the object will be 0 
(int by default to zero).

Thus to this call stack we need to somehow pass the refernce of this object being created in the heap. And then the refernce which 
we will pass will be having the empId which is the instance varibale for that object and then we can assign it.

So java provides the refernce of the particular instance/object from which this method is being called from and we can use that via (this : keyword).

So when we said 

public void setEmpId(int empId) {
        this.empId = empId;
}

and called it from emp object emp.setEmpId(1);

this keyword is referring to the object emp in the heap/ the current object from which we made the call.