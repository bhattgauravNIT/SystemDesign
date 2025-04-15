/**
 * 
 * Single responsibility principle states that a single class should have a single responsibility and thus only 
 * one reason to change.
 * 
   Lets take an example, if I m building a website for a restaurant, so i created a class restaurant
   now inside this class only i introduced logic for order handling and receipt generation say for example.

   Now everything is working fine, after some time I came up with a requirement that i need to alter
   the receipt generation logic as tax/gst norms got altered, so again i have to go to restaurant class and
   change logic of this method in restaurant class, this can have an impact over other working functionalities 
   and thus again this class needs to be tested thoroughly e-e, if in case the single responsibility principle 
   would have been followed here then, a separate receipt class would have been there, which we needed to modify 
   and then only e-e testing was needed for receipt class and overall high level testing for rest of application as always.

   In this way its always better to have classes/components which serves a single responsibility.
 * 
 */


class Restaurant {
    name: string;
    location: string;
    contactNumber: string;
    openTimings: string;
    closeTimings: string;
    isOpen: boolean;
    menu: Menu;
    receipt: Receipt;

    constructor() { };
}

class Menu {
    burgers: Burger;
    softDrink: SoftDrink;
}

class Burger { };

class SoftDrink { };

class Receipt { };