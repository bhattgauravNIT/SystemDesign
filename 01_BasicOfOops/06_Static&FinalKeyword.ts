/**
 * 
 * Static belongs to the class and it does not belongs to the object.
 * So once a field is set to static there does not get created copies of it while creation of
 * objects rather a single instance is passed to all the objects of that class.
 * If it is changes this instance gets changed for all the objects or instances of the class.
 * 
 * A non static field belong to the object and  separate copies are shared across to all the object/instances
 * of the class. Since it belong to object so if changed by one object it gets changed only for that specific
 * object.
 * 
 * Final keyword is used to make a field non changeable or it can't be modified by any object of the class or even
 * within the same class.
 * 
 */


class ClassRoom {
    static capacity: number = 40;
    readonly id: number = 1; // final id: number = 1;

    constructor() { };
}

let c1 = new ClassRoom();
console.log(ClassRoom.capacity);
ClassRoom.capacity = 41;
console.log(c1.id);
console.log(ClassRoom.capacity);