/**
 * 
 * Method overloading is also termed as compile time polymorphism.
 * Here in same class two or multiple functions has same name, return type but have different arguments.
 * Since at compile time only based on the number of arguments passed to invoke the function, that
 * specific function gets invoked and thus its compile time polymorphism.
 * 
 */


class AdvancedCalculator {
    add(num1: number, num2: number, num3?: number) {
        if (num3) {
            return num1 + num2 + num3;
        } else {
            return num1 + num2;
        }

    }
}

let calc: AdvancedCalculator = new AdvancedCalculator();
console.log(calc.add(1, 2, 3));
console.log(calc.add(1, 2));