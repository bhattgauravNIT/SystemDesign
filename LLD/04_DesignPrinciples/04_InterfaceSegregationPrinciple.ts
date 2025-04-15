/**
 * 
 * Interface segregation principle states that client should not be forced to implement interface whose 
 * all functionality it don't need to use.

   Lets take an example in which Interface segregation principle is violated.

   So in a restaurant, there are some kitchen work like, cooking, cleaning, serving.
   Now we have a cook class and this cook class does cooking and cleaning so he implements the interface
   kitchenTask but however serving task he don't do but since he is implementing kitchenTask interface and thus he is
   forced to implement serving method.

   Similarly a waiter also does kitchenTask and thus he implements kitchenTask interface but since he only does serving\
   and he has implemented kitchenTask interface and thus we is forced to implement cooking and cleaning.

 */

interface kitchenTask {
    cooking(): void;
    cleaning(): void;
    serving(): void;
}

class Cook implements kitchenTask {
    cooking(): void {
        console.log("cooking task")
    }
    cleaning(): void {
        console.log("cleaning task");
    }
    serving(): void {
        throw new Error("Method not implemented.");
    }

}

class Waiter implements kitchenTask {
    cooking(): void {
        throw new Error("Method not implemented.");
    }
    cleaning(): void {
        throw new Error("Method not implemented.");
    }
    serving(): void {
        console.log("serves");
    }

}

/**
 * This represents violation of interface segregation principle thus in order to fix this , the client should not be 
   forced to implement any interface whose functionality it don't use and thus we can refactor it as

   now we have implemented segregated interfaces and since cook needs only cleaning and cooking thus it implements
   cookable and cleanable similarly waiter needs only serving so he implements servable.

   Thus it now in lines with Interface segregation principle.
 */

interface cookable {
    cook(): void;
}

interface cleanable {
    clean(): void;
}

interface servable {
    serve(): void;
}

class Cooks implements cookable, cleanable {
    clean(): void {
        console.log("clean")
    }
    cook(): void {
        console.log("cook");
    }

}

class Waiters implements servable {
    serve(): void {
        console.log("serve");
    }
}