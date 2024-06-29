package Constructor;

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

public class Constructor {
    public static void main(String[] args) {
        Employee emp1 = new Employee(1, "Gaurav");
        Employee emp2 = new Employee(2, "Bhatt");
        Employee emp3 = new Employee();
        System.out.println(emp1.getEmpId() + " " + emp1.getName());
        System.out.println(emp2.getEmpId() + " " + emp2.getName());
        System.out.println(emp3.getEmpId() + " " + emp3.getName());
    }
}
