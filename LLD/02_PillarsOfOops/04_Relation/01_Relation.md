In relationship association simply means that two classes are associated to each other, this association can be of
two types i,e aggregation and composition.

There can be two kinds of relationship like has-a and part-of or in simple words
aggregation and composition.

Has-a is a aggregation relationship whereas part-of is a composition relationship.

###Composition/Part-of relation:

Take example of a body and heart,lungs,brains etc.
If the body is destroyed, the heart,lungs,brain also will be destroyed. So heart, lungs, brain etc can't seize to
exist independently without a body.

class Lungs {
    private lungCapacity: number;

    constructor(lungCapacity: number) {
        this.lungCapacity = lungCapacity;
    }

    getLungCapacity() {
        return this.lungCapacity;
    }
}

class Heart {
    private heartRate: number;

    constructor(heartRate: number) {
        this.heartRate = heartRate;
    }

    getHeartRate() {
        return this.heartRate;
    }
}

class HumanBody {
    private lungs: Lungs;
    private heart: Heart;

    constructor(lungCapacity: number, heartRate: number) {
        this.lungs = new Lungs(lungCapacity);
        this.heart = new Heart(heartRate);
    }

    getBodyDetails() {
        console.log(
            this.lungs.getLungCapacity(), this.heart.getHeartRate()
        );
    }
}

let human: HumanBody = new HumanBody(12, 90);
human.getBodyDetails();

In this example the lungs and heart are instances within the class HumanBody and once we create an instance
of HumanBody then only instance of lungs and heart gets created as these objects
are not passed as instances to human body but however is created internally inside it, in case humanBody instance gets destroyed or is deleted then these instances will also get deleted.

Such type of relationship is composition relationship.


##Aggregation/Has-a relation:

Take example of a school and a student. A school will have a student but student can exists independently as well.
If school is destroyed then student can still exist.

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

Here the school class needs student instance but this student instance is not direct created inside the
school class but rather passed as an argument while creation of school object. So even if school object gets destroyed
than also student object can seize to exists.

This type of relationship is aggregation and also known as has-a relation.


So in conclusion if lifetime of one object depends on another object then it is a part-of relationship
or composition relationship, whereas in case the lifecycle of an object is not destroyed if lifecycle 
of other object is destroyed but however still they need each other, then its a has-a relationship.