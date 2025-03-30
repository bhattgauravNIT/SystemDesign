/**
 * So Human class is the parent class and Person class is the child class or the
 * subClass because Person class is extending or inheriting from Human class.
 * 
 * This is called inheritance.
 * Now the person class will have access to all the non private members of the Human class.
 * This concept of inheriting properties from the super class is termed as inheritance.
 * 
 * There can be multiple type of inheritance like:
 * 
 * 1) Single level: When a child class inherits from a parent class its called single level inheritance.
 *
 * 2) Multi level: When a child class inherits from a parent class but the parent class also 
 *    inherits from some grandParent class its called multi-level inheritance.
 * 
 *  3) Hierarchical Inheritance: When multiple sub classes inherits from same parent class its called
 *     hierarchical inheritance.
 * 
 *   4) Multiple inheritance: When a single class inherits from two parents its called multiple 
 *     inheritance can potentially lead to diamond problem, where if both parents are having same 
 *     function/method then the child class will confuse that to inherit that particular function 
 *     from which of the parent.
 */

class Human {
    public walk: boolean = true;
    public talk: boolean;
    public sleep: boolean;

    constructor() { };
}

class Person extends Human {
    public hasKnowledge: boolean;

    constructor() {
        super();
    }
}

let P1 = new Person();
P1.walk = true;
P1.talk = true;
P1.sleep = true;