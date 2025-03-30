/**
 * 
 * Since multiple inheritance i,e inheriting from multiple parents leads to diamond problem
 * and thus we can't extend multiple classes from a sub class, there fore in oder to achieve
 * multiple inheritance we have some other workarounds.
 * 
 * 1) Using interfaces:
 *    We cant extend multiple classes but however we can implement multiple interfaces.
 * 
 */


interface Gun {
    fire(): void;
}

interface Knife {
    stab(): void;
}

class Player implements Knife, Gun {
    stab(): void {
        console.log("stab the opponent");
    }
    fire(): void {
        console.log("fire on the opponent");
    }
}

let p1 = new Player();
p1.stab();
p1.fire()