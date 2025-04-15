/**
 * 
 * In this example the lungs and heart are instances within the class HumanBody and once we create 
 * an instance of HumanBody then only instance of lungs and heart gets created as these objects
   are not passed as instances to human body but however is created internally inside it, 
   in case humanBody instance gets destroyed or is deleted then these instances will also get deleted.

   Such type of relationship is composition relationship.

 * 
 */


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