/**
 * 
 * As the name is suggesting, chain of responsibility so here we are concerned with a linked list
 * kind of structure , so different classes are chained to each other.
 * 
 * Lets understand it with help of an example, we are customer service provider and client can raise tickets or
 * incidents in our system. In case the ticket priority is low , the client can provide 
 * the ticket to the support agent, if in case the ticket priority is medium the client can either directly provide
 * the ticket to supervisor or he can follow the chain in which he assigns to the support person who then sends it to
 * his supervisor.
 * 
 * If the ticket priority is high, the client can directly send it to manager or he can follow the chain than he can
 * assign to support person, so sends to supervisor and then he send to manager.
 * 
 * We can see that if he follows the process of assigning and contacting the support person regarding a high priority
 * ticket, which needs to reach to manager but other classes also should know about the ticket so its a chain, and such
 * problems can be solved by chain of responsibility pattern. 
 * 
 * Lets understand it better with help of code
 * 
 * We have an abstract class supportHandler which has a reference to its own to implement dynamic method dispatching
 * as Agent, supervisor and manager will all extend this and thus will come under one hood.
 * 
 * This abstract class has a abstract method handleRequest which will be overrided by each individual class who extends it.
 * It also has a method setNextHandler which is to set or formulate the next node in the chain.
 * 
 * Now we have a agent class and it extends SupportHandler. It overrides the handleRequest method and if the priority
 * is low he himself handles the request else if there exists a next handler he sends it to the next handler.
 * 
 * Similar process is executed by Supervisor and manager for tickets of priority medium and hard respectively.
 * 
 * Now the client can interact with this system as
 * 
 * let agent: SupportHandler = new SupportAgent();
   let supervisor: SupportHandler = new SupportSuperVisor();
   let manager: SupportHandler = new Manager();
   agent.setNextHandler(supervisor);
   supervisor.setNextHandler(manager);
   
   agent.handleRequest("low");
   agent.handleRequest("medium");
   agent.handleRequest("high");

 * 
   In simpler words we can summarize chain of responsibility principle as one which keeps on sending the request
   to the next node in the chain until the request is resolved.
 */

abstract class SupportHandler {
    nextHandler: SupportHandler;

    setNextHandler(nextHandler: SupportHandler) {
        this.nextHandler = nextHandler;
    }

    abstract handleRequest(priority: string): void;
}

class SupportAgent extends SupportHandler {

    handleRequest(priority: string): void {
        if (priority === "low") {
            console.log("Request is handled by Support Agent");
        } else {
            if (this.nextHandler) {
                this.nextHandler.handleRequest(priority);
            }
        }
    }
}

class SupportSuperVisor extends SupportHandler {

    handleRequest(priority: string): void {
        if (priority === "medium") {
            console.log("Request is handled by Support supervisor");
        } else {
            if (this.nextHandler) {
                this.nextHandler.handleRequest(priority);
            }
        }
    }
}

class Manager extends SupportHandler {

    handleRequest(priority: string): void {
        if (priority === "high") {
            console.log("Request is handled by Manager");
        } else {
            if (this.nextHandler) {
                this.nextHandler.handleRequest(priority);
            }
        }
    }
}

let agent: SupportHandler = new SupportAgent();
let supervisor: SupportHandler = new SupportSuperVisor();
let manager: SupportHandler = new Manager();
agent.setNextHandler(supervisor);
supervisor.setNextHandler(manager);

agent.handleRequest("low");
agent.handleRequest("medium");
agent.handleRequest("high");


