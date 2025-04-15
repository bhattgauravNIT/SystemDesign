import { A } from "../05_AccessModifier/01_Package1";

class B {
    obj: A = new A("Called from Class B of different package");

    constructor() {};

    getNameOfA() {
        console.log(this.obj.name);
    }
}

let b = new B();
b.getNameOfA();