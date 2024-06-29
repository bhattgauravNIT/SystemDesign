package Oops;

/**
 * Abstraction is a concept in which we simply complex systems by focusing on essential charactericts. Lets
 * understand it thoroughly with the help of an example.
 * 
 * Suppose I have a class say Car class however in one of the methods drive I am unsure
 * of the actual implementation of it and however I wish that whichever class
 * will be inheriting
 * from this Car class should take care of this method however I have only
 * declared the method , saying that
 * please take care of this method implementation on your own once you mark Car
 * class as super class.
 * 
 * This can be achieved via abstract keyword so the class in which
 * 
 * 1. We wish to declare a abstract method then mark the class as an abstract
 * class.
 * 2. We wish to declare more than one abstract method mark the class as an abstract
 * class.
 * 3. We dont want any abstract method to be declared but however we dont wish
 * to allow creation of any object
 * of this class then also mark it as an abstract class.
 * 
 * Now once the class is mark as abstract and in case its having an abastract
 * method then this method needs to be
 * declared as well as defined in the child class which is extending this
 * abstract parent class.
 */

abstract class Car {
    public abstract void drive();

    public void playMusic() {
        System.out.println("Playing music");
    }
}

class Duster extends Car {
    public void drive() {
        System.out.println("Driving");
    }
}

public class Abstraction {
    public static void main(String[] args) {
        Duster obj = new Duster();
        obj.drive();
        obj.playMusic();
    }

}
