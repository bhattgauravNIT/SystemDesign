package Relationship.Association;

/**
 * Aggregration refers to (Has a ) relationship.
 * 
 * So a has a relationship is something like in which components ownes to each
 * other but however can exists independently or
 * can also be written as where one class contains a reference to another
 * class.
 * 
 * For ex: A student and a school. A school needs students and students also
 * need school but both can exists independently
 * even without each other.
 * 
 * Lets understand it with the help of the below example.
 * 
 * So we have a school class which has a schoolName and a location of the
 * school.
 * 
 * Similarly we have student class which has a name and needs a school refernce.
 * This resembles a aggregation relationship.
 * 
 * So Aggregation is a form of association where one class contains a reference
 * to
 * another class, and the lifecycle of the referenced class is independent of
 * the lifecycle of the containing class. This means that the referenced class
 * can exist independently of the containing class.
 * 
 * 
 * So referenced class school is independent of the lifecycle of the containing
 * class which is student class.
 * 
 */

class School {
    private String schoolName;
    private String location;

    public School(String name, String location) {
        this.schoolName = name;
        this.location = location;
    }

    public String getSchoolName() {
        return this.schoolName;
    }

    public String getLocation() {
        return this.location;
    }
}

class Student {
    private String name;
    private School school;

    public Student(String name, School school) {
        this.name = name;
        this.school = school;
    }

    public void printDetails() {
        System.out.println(
                this.name + " is studying at" + this.school.getSchoolName() + " at location "
                        + this.school.getLocation());
    }
}

public class Aggregation {
    public static void main(String[] args) {
        School school = new School("DPS", "Rajnagar Gzb");
        {
            Student std = new Student("Gaurav", school);
            std.printDetails();
        }
        // Accessing the School object outside the block scope of the Student object
        school.getSchoolName();
        school.getSchoolName();
    }
}
