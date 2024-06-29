package Oops;

/**
 * Lets take an example of a human brain as it has some data may be his name,
 * some passwords etc.
 * Now an outside world should not directly look inside the brain, get the info
 * which it wants.
 * There has to be a mechanism taht someone should ask us for that data and its
 * upto us whether we want to share or not.
 * Lets suppose we want to share then we can speak it or write it or type it
 * which are the various methods by which we allow access.
 * 
 * Meaning binding the data/instance varibales with methods such that no outside
 * world can have direct access to them is called
 * encapsulation.
 * 
 * In order to achive encapsulation we made the instance varibles private
 * meaning there access is now limited to the methods of the same
 * class.Now we used some functions like get and set which will set them and
 * thus we cant access them
 * directly from outside classes and there is a mechanism to set or get their
 * values via some methods.
 * 
 * This is called encapsulation.
 * 
 */

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
