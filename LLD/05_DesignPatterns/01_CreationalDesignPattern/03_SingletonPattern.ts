/**
 * 
 * Singleton pattern is used when we want to create a single instance of a class and it acts as an global reference and thus
 * next time when we wish to use it, this same first instance only its getting used.
 * 
 * Lets understand this with an example, logger which are used to log the logs in applications generally uses only a single 
 * instance as we don't need to create multiple objects for it and thus we use singleton design pattern in it.
 * 
 * So Logger class is having an static instance variable logger of Logger class itself. The constructor is kept as private
 * so that no new instances can get created via user and a static method getInstance is present which is responsible for
 * object creation of Logger class in class this logger instance variable is null or undefined, in case its not null or undefined
 * then we simply return this instance only and thus single instance is getting shared all the way across.
 * 
 * We have a getLogs method which prints the logs.
 * 
 * So now when we did
 * 
 * let log1: Logger | undefined = Logger.getInstance();
 * 
 * so at this time logger instance member of Logger class was null or undefined and thus a new instance of logger class
 * get created as Logger.logger = new Logger();
 * and constructor printed "Logger instance created"
 * 
 * now when we called getLog using this reference of instance of Logger class i,e 
 * log1?.getLog("This is first log and object gets created as initially object was null"); 
 * 
 * "This is first log and object gets created as initially object was null" gets printed.
 * 
 * Now when we second time did let log2: Logger | undefined = Logger.getInstance();
 * 
 * this time logger instance was not null or undefined and thus the previous instance only gets returned and
 * then we called getLog using this previous reference only
 * 
 * log2?.getLog("This is second log and now new object gets created and the first object only is reused");
 * 
 * and thus "This is second log and now new object gets created and the first object only is reused" gets printed.
 * 
 * This can be validated as console.log(log1 === log2); is true which means that the type as well as reference value of
 * both log1 and log2 are same and its a single object only.
 * 
 * So in general a singleton design pattern is used when no new references of class needs to be created as maybe the job of the
 * object is simply to invoke a function which just print a string so if we need to invoke this function n times why we need
 * to created n instances we can do n times invoking with a single instance also. In such scenarios SingleTon design pattern comes
 * into picture.
 * 
 * Lets understand the concept of lazy loading and eager loading with the help of singleton pattern.
 * 
 * Here we have created an static logger: Logger and have not initialized it.
 * This getInitialized in getInstance method only if this instance is not present meaning its null or undefined.
 * This concept that we load it whenever necessary is termed as lazy loading.
 * 
 * However if in case we would have initialized it at the start only like
 * static logger: Logger = new Logger();
 * 
 * as soon as the class loader loads this class an instance of it would have created and thus its called
 * eager loading. 
 * 
 */

class Logger {
    static logger: Logger;

    private constructor() {
        console.log("Logger instance created");
    };

    static getInstance() {
        if (!Logger.logger) {
            Logger.logger = new Logger();
        }
        return Logger.logger;
    }

    getLog(logs: string) {
        console.log(`Logging: ${logs}`);
    }
}

let log1: Logger | undefined = Logger.getInstance();
log1?.getLog("This is first log and object gets created as initially object was null");

let log2: Logger | undefined = Logger.getInstance();
log2?.getLog("This is second log and now new object gets created and the first object only is reused");


class Valid {
    constructor() { };
}

let v1 = new Valid();
let v2 = new Valid();
console.log(v1 === v2);

console.log(log1 === log2);


