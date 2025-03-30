/**
 * 
 * Open closed principle states that a class should be open for extension but closed for modification.
   So lets suppose I have a class which serves a single responsibility principle and now a new feature needs
   to be introduced so the existing class logic should not be altered i,e this class should not be open for
   modifications but however it should be open for extension.

   In below example I have to give discounts to costumers based on type of customer.
   Now as of now i only have two type of customer i,e general and premium.

   The code which i have written below does not comply with Open closed principle because if in case in future let us
   suppose one more category of customer has to be introduced say VIp then i have to alter the getDiscount method of Discount
   class by adding another if else condition but however according to openClose principle a class should not be
   open for modification.
 * 
 */


class Discount {
    constructor() { };

    getDiscount(spending: number, customerType: string) {
        if (customerType === "general") {
            return spending;
        } else if (customerType === "premium") {
            return spending * 0.8;
        }
    }
}

/**
 * In order to fix this issue, the code should ideally be refactored as
 * 
 * We have a DiscountStrategy which is a interface and provide declaration for applyDiscount method.
 * The all different types of customers like Premium , VIp or general classes implements this interface 
 * and thus override or provide their own implementation for this function applyDiscount.
 * 
 * Now the Discount class has a aggregation relationship with interface DiscountStrategy and expects an
 * instance/reference of DiscountStrategy in its constructor.
 * 
 * Since the task is to provide various types of customers to Discount class and type of customers can vary thus we
 * can't direct create a dependency of discount class over any specific type of customer like Premium , Vip etc.
 * Thus we have created a aggregation of Discount and discount strategy interface. We can't directly create
 * object from interface but however if a Class is implementing that interface than the object of that class can also
 * act as reference to that interface and thus we can pass different types of customers via using this concept.
 * 
 * Now the discount class has a applyDiscount method and thus this definition has invocation to specific applyDiscount method
 * of that class which is invoking it.
 * 
 * Now this design is following the open closed principle as if a new type of customer is introduced than we don't need 
 * to change or modify any existing code rather just simply create a new class and make it implement its own discount strategy.
 */

interface DiscountStrategy {
    applyDiscount(price: number): number;
}

class Premium implements DiscountStrategy {
    applyDiscount(price: number): number {
        return price * 0.8;
    }
}

class VIP implements DiscountStrategy {
    applyDiscount(price: number): number {
        return price * 0.7;
    }
}

class General implements DiscountStrategy {
    applyDiscount(price: number): number {
        return price;
    }
}

class Discounts {

    private strategy: DiscountStrategy;

    constructor(strategy: DiscountStrategy) {
        this.strategy = strategy;
    }

    applyDiscount(price: number) {
        return this.strategy.applyDiscount(price);
    }
}

let premium = new Discounts(new Premium());
console.log(premium.applyDiscount(100));

let vip = new Discounts(new VIP());
console.log(vip.applyDiscount(100));

let general = new Discounts(new General());
console.log(general.applyDiscount(100));


