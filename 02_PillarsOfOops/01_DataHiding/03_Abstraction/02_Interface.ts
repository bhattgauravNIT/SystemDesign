/**
 * Here the audio features and steering are interfaces which are implemented by
 * Car class. Thus car class is implementing all methods and blueprints of audio features
 * and steering interface.
 */

interface audioFeatures {
    maxVolume: number;

    playSound(): void;
    changeBase(): void;
}

interface steering {
    rotateSteering(): void;
    tiltSteering(): void;
}

class Car implements audioFeatures, steering {
    maxVolume: number = 100;
    rotateSteering(): void {
        throw new Error("Method not implemented.");
    }
    tiltSteering(): void {
        throw new Error("Method not implemented.");
    }
    playSound(): void {
        throw new Error("Method not implemented.");
    }
    changeBase(): void {
        throw new Error("Method not implemented.");
    }
}

let c1 = new Car();
console.log(c1.maxVolume);

