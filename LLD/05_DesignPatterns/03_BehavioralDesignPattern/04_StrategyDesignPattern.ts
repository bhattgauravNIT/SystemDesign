/**
 * 
 * Strategy pattern helps us to bind multiple algorithms together in our unit at run time i,e through
 * dynamic method dispatching. Once the client mentions the strategy/algorithm through which he needs that
 * work to be done, the work gets done by that strategy.
 * 
 * Lets consider an example.
 * 
 * We are a payment gateway and we can provide payments through multiple ways like
 * credit card, paypal, net banking , upi etc.
 * 
 * So there are all the strategies through which payment can be done , thus we will design this system in such a
 * way that if later a new payment mode is introduced then even we will respect all the SOLID principles.
 * 
 * Now all different strategies of payment can be through credit card, net banking and paypal as of now
 * we create three class each of each strategy.
 * 
 * Now we bind them together using an interface Payment for dynamic method dispatching.
 * 
 * Now the paymentGateway takes an reference of one of these strategies through the client and call the
 * makePayment accordingly for the respective strategy.  
 * 
 */

interface Payment {
    makePayment(amount: number): void;
}

class CreditCard implements Payment {

    makePayment(amount: number): void {
        console.log(`Making payment of ${amount} through Credit card`)
    }

}

class Paypal implements Payment {

    makePayment(amount: number): void {
        console.log(`Making payment of ${amount} through paypal`)
    }

}

class NetBanking implements Payment {

    makePayment(amount: number): void {
        console.log(`Making payment of ${amount} through net banking`)
    }

}

class PaymentGateway {
    private payment: Payment;

    setPaymentStrategy(payment: Payment) {
        this.payment = payment;
    }

    makePayment(amount: number) {
        this.payment.makePayment(amount);

    }
}

let pg = new PaymentGateway();
pg.setPaymentStrategy(new CreditCard());
pg.makePayment(20);

pg.setPaymentStrategy(new NetBanking());
pg.makePayment(100);

pg.setPaymentStrategy(new Paypal());
pg.makePayment(300);