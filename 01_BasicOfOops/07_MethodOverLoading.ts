/**
 * 
 * In other programming languages method overloading refers to the concept
 * of having multiple functions with same name but capable of accepting different arguments.
 * 
 * For ex, say in calculator class we want to add two number, so the add function can take 2 parameters, but
 * say we also want to add three numbers so we can again create a same add function but this time it
 * can accept three parameters, so from the object we will call add function only but however based on the
 * number of arguments passed that specif method of add will gets invoked.
 * 
 * In ts we can solve this problem by using rest operator, by passing it in function arguments it gets accepted
 * as a array, so we can simply parse the array and add all the input values.
 * 
 */

class Calculator {
    constructor() { };

    add(...nums: number[]) {
        let sm = 0;
        for (let i of nums) {
            sm += i;
        }
        return sm;
    }
}

let calc = new Calculator();
console.log(calc.add(1, 2, 5, 6));