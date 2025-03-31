/**
 * 
 * Lets suppose we have two incompatible interface that cant wok together, so we place an adapter in between, the role
 * of this adapter is to make these two interfaces communicate and work together.
 * 
 * So adapter design pattern bridges the gap between two incompatible interfaces and is best suited for integration
 * of third party services with our existing code.
 * 
 * Lets understand this with help of an example.
 * 
 * Say we are a paymentGateway provider, at this time we can process standard transaction via say banks however
 * now the client say amazon which is using our payment gateway now wants paypal payments also to happen through our
 * gateway so paypal is a third party and has provided us with api to integrate with our code, clearly our code and
 * this third party paypal can't interact with each other directly thus we need a adapter in between so that our gateway can
 * support paypal payments as well.
 * 
 * Lets understand this with help of code.
 * 
 * We have an e commerce site which uses our payment gateway and we have provided him with our interface PaymentGateway.
 * He wants us to incorporate the payPal payment in our gateway.
 * 
 * So we have paymentGateway interface which has method declaration of processPayment.
 * 
 * Now The paypal which is a third party has provided us with Paypal payment interface which is PayPalPayment and it has
 * a function makePaymentUsingPaypal which does its job of making payment.
 * 
 * Our interface can't interact with PaypalPayment directly as for that PayPayment needs to implement our interface 
 * PaymentGateway which they won't do as being gateway provider for payment its our responsibility to in corporate
 * 3rd party in our code.
 * 
 * Now the e-commerce will make payment through our gateway this means they will simply create an instance of PaymentGate
 * only in their code.
 * 
 * Now we create an PaypalPaymentAdapter which implements our interface thus it can act as reference of PaymentGateway
 * even for our main e-commerce client and this adapter can have an instance of payPalPayment which can call the main
 * makePaymentUsingPayPal of our third party inside the processPayment method which it will override of our PaymentGateway
 * interface.
 * 
 * This is adapter design pattern
 * 
 */

interface PaymentGateway {
    processPayment(amount: number): void;
}

class PaypalPayment {
    makePaymentUsingPaypal(amount: number) {
        console.log(`making payment of ${amount} through paypal`)
    }
}

class PaypalAdapter implements PaymentGateway {

    payPal: PaypalPayment;

    constructor(payPal: PaypalPayment) {
        this.payPal = payPal;
    }

    processPayment(amount: number): void {
        this.payPal.makePaymentUsingPaypal(amount);
    }
}

let paypalPayment: PaypalPayment = new PaypalPayment();
let paymentGateway: PaymentGateway = new PaypalAdapter(paypalPayment);
paymentGateway.processPayment(20);

