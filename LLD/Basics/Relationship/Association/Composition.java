package Relationship.Association;

/**
 * Composition is also considered as a part of assocation however in this case
 * one class (the whole) contains a reference to another class (the part),
 * and the lifecycle of the part is dependent on the whole.
 * 
 * For ex: a room is a part of a house and if a house gets destoyed room cant
 * exist.
 * 
 * Lets understand this with the help of below code:
 * 
 * We have a class Room with roomNumber as a instance variable.
 * Similarly we have a House class which have instances as name, houseNumber and
 * a room which is instance of Room class.
 * In the constructor of House we are creating an object of room.
 * 
 * Now in the main whenever create a house object and pass room number the room
 * object will gets created automatically and once
 * the scope of the house object end it will also marks as the end of the room
 * object.
 * 
 * Such kind of associations is termed as part of relations of composition.
 * 
 */

class Room {
    private int roomNumber;

    public Room(int roomNo) {
        this.roomNumber = roomNo;
    }
}

class House {
    private String name;
    private int houseNumber;
    private Room room;

    public House(String name, int houseNumber, int roomNumber) {
        this.name = name;
        this.houseNumber = houseNumber;
        this.room = new Room(roomNumber);
    }
}

public class Composition {
    public static void main(String[] args) {
        House house = new House("BhattSadan", 1, 0);
    }
}
