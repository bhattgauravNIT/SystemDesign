/**
 * 
 * Below is our abstract class and it contains 
 * abstract methods, these abstract methods are always public so that
 * other classes extending this abstract class can implement these features/methods.
 * We have only provided deceleration for these methods/features and not implementation
 * and these abstract methods are always present inside abstract classes.
 * 
 */


abstract class OurFeatures {

    abstract syncToGoogleCloud(): void;
    abstract syncToAWSCloud(): void;

    sayHello() {
        return "Hii welcome to Our features";
    }
}

class Feature extends OurFeatures {
    syncToGoogleCloud(): void {
        throw new Error("Method not implemented.");
    }
    syncToAWSCloud(): void {
        throw new Error("Method not implemented.");
    }

}