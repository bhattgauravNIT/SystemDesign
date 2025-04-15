/**
 * 
 * Bridge patterns are simple are easy to understand, let understand this situation in which we have multiple
 * brands of Tv like say, samsung, sony, Mi etc. There exists a single remote which is capable of working with
 * any Tv brand, the client has access to remote and wants to use this remote for multiple Tv brands, here the bridge
 * pattern will come into picture.
 * 
 * A bridge pattern provides a bridge between abstraction and implementation, in this case remote is abstraction
 * and implementation is tv so we are trying to decouple abstraction from implementation.
 * 
 * Lets understand it better with help of an example:
 * 
 * There can be multiple brands of Tv like samsung, Sony ,Lg, Mi etc, so first we created a Tv interface and every brand
 * can provide its own set of implementations that how it wishes to work. Every Tv brand has its own implementation and
 * this is what we refer by implementation in the phrase "decouple abstraction from implementation"
 * 
 * Now remote should not directly depend on any of implementation thus decouple will happen.
 * In oder to achieve this we created a abstract class remote which takes a reference of Tv interface, since all the brands
 * which implements this interface can be considered as reference of Tv, thus we can see that remote is not directly
 * depending upon any specif implementation and thus we have provided a bridge between implementation and abstraction.
 * 
 * This bridge is basically this reference of Tv which is marked in abstract class remote.
 * 
 * Now a basic Remote can extend this abstract class and take a reference of any Tv
 * and can call methods of Tv interface using the this reference which will internally call the specific 
 * implementation.
 * 
 * The user can create an instance of basic remote and can pass any reference of any Tv brand, and it will work fine
 * with it.
 * 
 */

interface Tv {
    turnOn(): void;
    turnOff(): void;
    changeChannel(id: number): void;
}

class SamsungTv implements Tv {
    turnOn(): void {
        console.log("Turning samsung Tv on")
    }
    turnOff(): void {
        console.log("Turning samsung Tv off")
    }
    changeChannel(id: number): void {
        console.log(`Changing channel of Samsung Tv to channel number: ${id}`)
    }
}

class SonyTv implements Tv {
    turnOn(): void {
        console.log("Turning sony Tv on")
    }
    turnOff(): void {
        console.log("Turning sony Tv off")
    }
    changeChannel(id: number): void {
        console.log(`Changing channel of sony Tv to channel number: ${id}`)
    }
}

abstract class Remote {
    protected tv: Tv // this acts as a bridge for remote with different Tv's

    public constructor(tv: Tv) {
        this.tv = tv;
    }

    abstract turnOn(): void;
    abstract turnOff(): void;
    abstract setChannel(id: number): void;
}

class BasicRemote extends Remote {

    constructor(tv: Tv) {
        super(tv);
    }

    turnOn(): void {
        this.tv.turnOn();
    }
    turnOff(): void {
        this.tv.turnOff();
    }
    setChannel(id: number): void {
        this.tv.changeChannel(id);
    }
}

let samsungTv: Tv = new SamsungTv();
let sonyTv: Tv = new SonyTv();
let basicRemote: BasicRemote = new BasicRemote(samsungTv);
basicRemote.turnOn();
basicRemote.turnOff();
basicRemote.setChannel(2);

basicRemote = new BasicRemote(sonyTv);
basicRemote.turnOn();
basicRemote.turnOff();
basicRemote.setChannel(2);