/**
 * 
 * In order to understand template design pattern, lets consider a scenario.
 * We need to make tea and we need to make coffee, so lets write down the steps to make tea and to make coffee
 * respectively.
 * 
 * Tea:
 * 
 * Boil water
 * AddTea
 * Add condiments for tea
 * Pour in cup
 * serve
 * 
 * 
 * Coffee:
 * 
 * Boil water
 * Brew
 * Add condiments for coffee
 * Pour in cup
 * Serve
 * 
 * Now if we see there are some methods which remains common in both the process, i,e Boil water, Pour in cup and Serve
 * however some methods depend upon each individual tea or coffee preparation like AddTea in tea prep, add condiments of tea like
 * cardamon etc whereas in coffee they are brew the coffee, add condiments of coffee like coffee powder etc.
 * 
 * In such type of scenario one way to solve the problem is to use separate classes for tea and coffee and define all the methods
 * individually in each class however it violates DRY principle i,e Do not repeat yourself. As the methods which are common in both
 * of the preparations will be repeated in both the classes and this is simply code duplication.
 * 
 * Another way is to create one interface and declare these common methods there and make each class implement it and provide method
 * definition to each common method, but these common methods have same definition too in each of the class thus again its code 
 * repetition and thus we need to create an abstract class where these common methods will be provided with method definition as well
 * and make the individual classes extend this abstract class and get the common methods from this , however they can individually
 * provide the uncommon or class specific methods in their own classes.
 * 
 */

abstract class Process {
    boilWater(): void {
        console.log("Boiling water");
    }

    pourInCup(): void {
        console.log("Pouring in cup");
    }

    server(): void {
        console.log("serving");
    }
}

class Tea extends Process {
    addTea(): void {
        console.log("Adding tea");
    }

    addCondiments() {
        console.log("adding milk, sugar and cardamon");
    }
}

class Coffee extends Process {
    brewCoffee(): void {
        console.log("Adding coffee");
    }

    addCondiments() {
        console.log("adding milk, sugar and coffee powder");
    }
}

let tea: Tea = new Tea();
tea.boilWater();
tea.addTea();
tea.addCondiments();
tea.pourInCup();
tea.server();

let coffee: Coffee = new Coffee();
coffee.boilWater();
coffee.brewCoffee();
coffee.addCondiments();
coffee.pourInCup();
coffee.server();