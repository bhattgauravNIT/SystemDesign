/**
 * 
 * Decorator design pattern is helpful when we need to add more functionalities or more behaviors to an object
 * without altering its structure or its class.
 * 
 * This means wrapping over new functionality over the previously added functionality.
 * 
 * Lets try and understand this with help of a scenario.
 * 
 * We have a coffee shop where a basic coffee has a cost and say a description, but however if the customer wants an
 * add on to the coffee with more milk the cost of coffee changes and we have an add on of more milk cost over the basic 
 * coffee cost, now say he can also have an add on with extra sugar so the previous cost of coffee which was
 * basicCoffee + more milk will be added on with more sugar and thus wrapping of new behavior is happening over
 * existing behavior.
 * 
 * Consider it like creating more and more bigger circles over previous circles.
 * 
 * So in this scenario if we don't consider solving the problem via decorator design pattern than we need a coffee class object
 * for simple coffee say c1.
 * 
 * We need a coffee + milk class object say c2.
 * 
 * we need a coffee + milk + sugar class object say c3.
 * 
 * Here we can see that parent class can remain coffee but too many subclasses of coffee needs to be incorporated like
 * coffee + milk subclass and coffee + milk + sugar subclass.
 * 
 * Now suppose there are multiple add ons in future like honey, whipped cream, normal cream, sugarFree etc, thus multiple
 * permutations and combinations can happen which can affect the cost of 
 * coffee and thus this situation can lead to class explosion where there are too many subclasses for different variations.
 * 
 * Thus in order to handle situation of class explosion the decorator design pattern comes into picture.
 * 
 * Lets understand it better using coffee example itself. 
 * 
 * So we have an coffee interface which have a cost method declaration and a description method declaration.
 * 
 * Now we can have a basic coffee , so we created a basic coffee class it implements Coffee and thus we provide declaration for
 * cost and description.
 * 
 * Now we can have a coffeeDecorator which will help avoiding class explosion for basicCoffee class.
 * Coffee decorator class has a protected member variable of type Coffee, although coffee is an interface but what so ever classes
 * implementing this interface can be considered reference to it. The constructor of coffee decorator expects a object/reference of
 * Coffee as we can see in the constructor.
 * 
 * The cost method returns the current cost of Coffee and the description returns the current description.
 * 
 * Now we want a Milk add on so we created a MilkDecorator
 * 
 * This milk decorator class extends coffeeDecorator and not BaseCoffee itself as we are trying to avoid class explosion for BasicCoffee.
 * Now this milk decorator is a child/subClass of CoffeeDecorator and overrides the cost and description methods of CoffeeDecorator class.
 * 
 * Similarly we have a sugarDecorator class. This sugar decorator class extends coffeeDecorator and not BaseCoffee itself as we are trying 
 * to avoid class explosion for BasicCoffee. Now this sugar decorator is a child/subClass of CoffeeDecorator and overrides the cost 
 * and description methods of CoffeeDecorator class.
 * 
 * Now once we create an instance of Coffee using
 * 
 * let coffee: Coffee = new BasicCoffee();
 * the current cost is the cost of basic coffee and current description is the basic description.
 * 
 * However if the user wants to have a milk addOn he can simply do
 * 
 * coffee = new MilkDecorator(coffee);
 * now the cost of coffee has added up with new cost from milk decorator and same with description.
 * 
 * now if the user wants to have an add on of sugar over this, it means that he is having an add on over basic coffee + milk
 * and not simply basic coffee and thus now the cost will change based on currentInstance cost + new add on cost of sugar
 * 
 * This first when we created simply instance of coffee via basic coffee our cost was 100.
 * When we had an addon with milk it became 120.
 * 
 * Now when we had an add on with sugar it became 120+ 10 = 130
 * 
 * This means in decorator pattern each decorator wraps the previous decorator and each decorator keeps wrapping the object
 * with new wrapping over the previous wrapping and not the original entity which we started from.
 * 
 * Another classic example of Decorator design pattern is that in node.js we use app.use()
 * 
 * Say we did app.use(Cors)
 * app.use(Helmet)
 * 
 * so cors functionality gets wrapped over helmet as well.
 * 
 */

interface Coffee {
    cost(): number;
    description(): string;
}

class BasicCoffee implements Coffee {
    cost() {
        return 100;
    }

    description() {
        return "Basic variation of coffee, Addons: ";
    }
}

class CoffeeDecorator {
    protected coffee: Coffee;

    constructor(coffee: Coffee) {
        this.coffee = coffee;
    }

    cost() {
        return this.coffee.cost();
    }

    description() {
        return this.coffee.description();
    }
}

class MilkDecorator extends CoffeeDecorator {
    cost() {
        return this.coffee.cost() + 20;
    }

    description(): string {
        return this.coffee.description() + ": Milk"
    }
}

class SugarDecorator extends CoffeeDecorator {
    cost() {
        return this.coffee.cost() + 10;
    }

    description(): string {
        return this.coffee.description() + ", Sugar"
    }
}


let coffee: Coffee = new BasicCoffee();
console.log(coffee.cost());
console.log(coffee.description());

// Milk is wrapped over the basic coffee
coffee = new MilkDecorator(coffee);
console.log(coffee.cost());
console.log(coffee.description());

// Sugar is wrapped over basic coffee + milk
coffee = new SugarDecorator(coffee);
console.log(coffee.cost());
console.log(coffee.description());
