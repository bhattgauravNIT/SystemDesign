export class A {
    public name: string;
    private rollNumber: number;
    protected marks: number;

    constructor(name?: string, marks?: number, rollNumber?: number,) {
        this.name = name || "";
        this.rollNumber = rollNumber || -1;
        this.marks = marks || -1;
    }

    getName() {
        return this.name;
    }

    getRollNumber() {
        return this.rollNumber;
    }

}

class C extends A {

    constructor(name?: string, marks?: number) {
        super(name, marks);
    };

    getMarksOfA() {
        return this.marks;
    }
}

let obj1 = new C("Called from same package but different class", 90);
console.log(obj1.name);
console.log(obj1.getMarksOfA());

let objA = new A();
objA.getRollNumber();
