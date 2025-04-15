/**
 * 
 * Dependency inversion principle states that a high level module should not be directly dependent upon a low level
   module and vice versa and they should be segregated by some
   level of abstraction. This helps in decoupling or helps in reduction of tight coupling between modules.

   Lets understand this with help of an example.

   In my application to save the user we are using sql database but later there may arise a situation in which we need to
   use mongo db or even some needs to be saved in mongo db and some needs to be saved in sql itself.

   If we write the code like below it would be a violation of dependency inversion principle as the low level module
   which is our database class is tightly coupled or is directly dependent upon the high level module or the user class
   and thus if we need to change to mongo db later it would case change in the low level as well as the high level module.
 * 
 */


// Low level module
class Sql {
    save(data: any) {
        console.log("saving data to sql servers");
    }
}


//High level module
class User {
    sql: Sql;
    constructor() {
        this.sql = new Sql();
    }

    save(data: any) {
        this.sql.save(data)
    }
}


/**
 * 
 * Since this is a problem and thus we need to follow dependency inversion principle , thus we will refactor the code
 * to something like.
 * 
 * Now there is no direct dependency between the low level module Sql1, MongoDb and the highLevel module User1.
 * Instead there is a abstraction between them i,e Database interface.
 * 
 * Now this user class takes a reference of the interface and since mongo db and sql1 class both implement
 * this interface thus the reference of these classes can also be passed as reference for Database interface since
 * we can't create object of interface directly.
 * 
 * Now based on the reference passed like sql1 or mongoDb that specif save method gets invoked. 
 * 
 */

interface Database {
    save(data: any): void;
}

// low level module
class Sql1 implements Database {
    save(data: any): void {
        console.log("saving data to sql servers");
    }
}

//low level module
class MongoDb implements Database {
    save(data: any): void {
        console.log("saving data to mongodb");
    }
}

//high level module
class User1 {
    database: Database;
    constructor(database: Database) {
        this.database = database;
    }

    save(data: any) {
        this.database.save(data);
    }
}

let user = new User1(new Sql);
user.save("data");

let user1 = new User1(new MongoDb);
user1.save("data");
