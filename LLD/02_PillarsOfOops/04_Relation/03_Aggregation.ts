/**
 * 
 * This is an example of has-a relationship
 * 
 * Here the school class needs student instance but this student instance is not direct created inside the
   school class but rather passed as an argument while creation of school object. 
   So even if school object gets destroyed than also student object can seize to exists.

   This type of relationship is aggregation and also known as has-a relation.
 */


class Student {
    name: string;
    constructor(name: string) {
        this.name = name;
    };

    getStudentName() {
        return this.name;
    }
}

class School {
    stud: Student;
    constructor(stud: Student) {
        this.stud = stud;
    }

    getDetails() {
        return this.stud.getStudentName();
    }
}

let student = new Student("Gaurav");
let school = new School(student);
console.log(school.getDetails());