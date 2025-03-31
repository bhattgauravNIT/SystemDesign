**Structural design pattern**

Structural design pattern helps in simplifying or defining relationship between the objects.
Moreover it focus on how objects can be composed to form a larger structure.

Ex:

1) **Decorator Pattern:**

Decorator design pattern is helpful when we need to add more functionalities or more behaviors to an object
without altering its structure or its class.
 
This means wrapping over new functionality over the previously added functionality.
 
Lets try and understand this with help of a scenario.
 
We have a coffee shop where a basic coffee has a cost and say a description, but however if the customer wants an
add on to the coffee with more milk the cost of coffee changes and we have an add on of more milk cost over the basic 
coffee cost, now say he can also have an add on with extra sugar so the previous cost of coffee which was
basicCoffee + more milk will be added on with more sugar and thus wrapping of new behavior is happening over
existing behavior.
 
Consider it like creating more and more bigger circles over previous circles.
 
So in this scenario if we don't consider solving the problem via decorator design pattern than we need a coffee class object
for simple coffee say c1.

We need a coffee + milk class object say c2.
 
we need a coffee + milk + sugar class object say c3.
 
Here we can see that parent class can remain coffee but too many subclasses of coffee needs to be incorporated like
coffee + milk subclass and coffee + milk + sugar subclass.
 
Now suppose there are multiple add ons in future like honey, whipped cream, normal cream, sugarFree etc, thus multiple
permutations and combinations can happen which can affect the cost of 
coffee and thus this situation can lead to class explosion where there are too many subclasses for different variations.
 
Thus in order to handle situation of class explosion the decorator design pattern comes into picture.
 
Lets understand it better using coffee example itself. 
 
So we have an coffee interface which have a cost method declaration and a description method declaration.
 
Now we can have a basic coffee , so we created a basic coffee class it implements Coffee and thus we provide declaration for
cost and description.
 
Now we can have a coffeeDecorator which will help avoiding class explosion for basicCoffee class.
Coffee decorator class has a protected member variable of type Coffee, although coffee is an interface but what so ever classes
implementing this interface can be considered reference to it. The constructor of coffee decorator expects a object/reference of
Coffee as we can see in the constructor.
 
The cost method returns the current cost of Coffee and the description returns the current description.
 
Now we want a Milk add on so we created a MilkDecorator
 
This milk decorator class extends coffeeDecorator and not BaseCoffee itself as we are trying to avoid class explosion for BasicCoffee.
Now this milk decorator is a child/subClass of CoffeeDecorator and overrides the cost and description methods of CoffeeDecorator class.
 
Similarly we have a sugarDecorator class. This sugar decorator class extends coffeeDecorator and not BaseCoffee itself as we are trying 
to avoid class explosion for BasicCoffee. Now this sugar decorator is a child/subClass of CoffeeDecorator and overrides the cost 
and description methods of CoffeeDecorator class.

Now once we create an instance of Coffee using
 
let coffee: Coffee = new BasicCoffee();
the current cost is the cost of basic coffee and current description is the basic description.
 
However if the user wants to have a milk addOn he can simply do
 
coffee = new MilkDecorator(coffee);
now the cost of coffee has added up with new cost from milk decorator and same with description.
 
now if the user wants to have an add on of sugar over this, it means that he is having an add on over basic coffee + milk
and not simply basic coffee and thus now the cost will change based on currentInstance cost + new add on cost of sugar
 
This first when we created simply instance of coffee via basic coffee our cost was 100.
When we had an addon with milk it became 120.

Now when we had an add on with sugar it became 120+ 10 = 130

This means in decorator pattern each decorator wraps the previous decorator and each decorator keeps wrapping the object
with new wrapping over the previous wrapping and not the original entity which we started from.

Another classic example of Decorator design pattern is that in node.js we use app.use()
Say we did app.use(Cors)
app.use(Helmet)
 
so cors functionality gets wrapped over helmet as well.


interface Coffee {
    cost(): number;
    description(): string;
}

class BasicCoffee implements Coffee {
    cost() {
        return 100;
    }

    description() {
        return "Basic variation of coffee, Addons: ";
    }
}

class CoffeeDecorator {
    protected coffee: Coffee;

    constructor(coffee: Coffee) {
        this.coffee = coffee;
    }

    cost() {
        return this.coffee.cost();
    }

    description() {
        return this.coffee.description();
    }
}

class MilkDecorator extends CoffeeDecorator {
    cost() {
        return this.coffee.cost() + 20;
    }

    description(): string {
        return this.coffee.description() + ": Milk"
    }
}

class SugarDecorator extends CoffeeDecorator {
    cost() {
        return this.coffee.cost() + 10;
    }

    description(): string {
        return this.coffee.description() + ", Sugar"
    }
}


let coffee: Coffee = new BasicCoffee();
console.log(coffee.cost());
console.log(coffee.description());

// Milk is wrapped over the basic coffee
coffee = new MilkDecorator(coffee);
console.log(coffee.cost());
console.log(coffee.description());

// Sugar is wrapped over basic coffee + milk
coffee = new SugarDecorator(coffee);
console.log(coffee.cost());
console.log(coffee.description());


2) **Facade design Pattern:**

Facade design pattern is used to simply a larger and complex system of classes, so instead of dealing
with multiple classes to perform an action, they can interact with one single facade class, so facade class
acts as a wrapper which hides the complexities associated with individual classes and provide a simpler unified approach
to the problem.

Lets understand this with help of an example,

say we have a home theater so home theater can have multiple things like amplifier, projector, dvd, sound system etc.
Now say we want to watch a movie so ideally what we need to do is turn on dvd, turn on projector, turn on sound system,
turn of amplifier and play dvd. These are all the task associated with watching a movie, similarly if we want to turn off
home theater than we have to turn off dvd, turn off projector, turn off sound system, turn off amplifier, these are
all the task associated with turing off a home theater.

So instead of user interacting with all these classes like amplifier, projector, dvd, sound system we can create a facade
class which interacts and take care of all these things whereas the user just interacts with this single facade class.

This is the intuition of facade design pattern.

Lets understand it better with code.

So we have classes like amplifier, projector, dvd , sound system and all classes have its own set of functionalities
like they can be turned off , turned on , played etc.

Instead of the user directly interacting with these classes in order to use HomeTheater we have created a facade of 
HomeTheater and this deals with handling all these classes internally like playing a homeTheater needs
amplifier to be turned on, projector to be turned on, dvd to be turned on and sound system to be turned on and
dvd to be played.

In this way we have limited the interaction of user to facade class only which takes cares of everything and
provided a simpler unified approach to the problem.


class Amplifier {
    turnOff() {
        console.log("Turning amplifier off");
    }

    turnOn() {
        console.log("Turning amplifier on");
    }
}

class Projector {
    turnOff() {
        console.log("Turning projector off");
    }

    turnOn() {
        console.log("Turning projector on");
    }
}

class Dvd {
    turnOff() {
        console.log("Turning Dvd off");
    }

    turnOn() {
        console.log("Turning Dvd on");
    }

    play() {
        console.log("Playing dvd");
    }
}

class SoundSystem {
    turnOff() {
        console.log("Turning sound system off");
    }

    turnOn() {
        console.log("Turning sound system on");
    }
}

class HomeTheaterFacade {

    private amplifier: Amplifier;
    private projector: Projector;
    private dvd: Dvd;
    private soundSystem: SoundSystem;

    constructor(amplifier: Amplifier, projector: Projector, dvd: Dvd, soundSystem: SoundSystem) {
        this.amplifier = amplifier;
        this.projector = projector;
        this.dvd = dvd;
        this.soundSystem = soundSystem;
    }

    playHomeTheater() {
        this.amplifier.turnOn();
        this.projector.turnOn();
        this.dvd.turnOn();
        this.soundSystem.turnOn();
        this.dvd.play();
    }

    turnOffHomeTheater() {
        this.amplifier.turnOff();
        this.projector.turnOff();
        this.dvd.turnOff();
        this.soundSystem.turnOff();
    }
}

let amplifier: Amplifier = new Amplifier();
let projector: Projector = new Projector();
let dvd: Dvd = new Dvd();
let soundSystem: SoundSystem = new SoundSystem();
let homeTheater: HomeTheaterFacade = new HomeTheaterFacade(amplifier, projector, dvd, soundSystem);
homeTheater.playHomeTheater();
homeTheater.turnOffHomeTheater();


3) **Adapter design Pattern:**

Lets suppose we have two incompatible interface that cant wok together, so we place an adapter in between, the role
of this adapter is to make these two interfaces communicate and work together.

So adapter design pattern bridges the gap between two incompatible interfaces and is best suited for integration
of third party services with our existing code.

Lets understand this with help of an example.

Say we are a paymentGateway provider, at this time we can process standard transaction via say banks however
now the client say amazon which is using our payment gateway now wants paypal payments also to happen through our
gateway so paypal is a third party and has provided us with api to integrate with our code, clearly our code and
this third party paypal can't interact with each other directly thus we need a adapter in between so that our gateway can
support paypal payments as well.

Lets understand this with help of code.

We have an e commerce site which uses our payment gateway and we have provided him with our interface PaymentGateway.
He wants us to incorporate the payPal payment in our gateway.

So we have paymentGateway interface which has method declaration of processPayment.

Now The paypal which is a third party has provided us with Paypal payment interface which is PayPalPayment and it has
a function makePaymentUsingPaypal which does its job of making payment.

Our interface can't interact with PaypalPayment directly as for that PayPayment needs to implement our interface 
PaymentGateway which they won't do as being gateway provider for payment its our responsibility to in corporate
3rd party in our code.

Now the e-commerce will make payment through our gateway this means they will simply create an instance of PaymentGate
only in their code.

Now we create an PaypalPaymentAdapter which implements our interface thus it can act as reference of PaymentGateway
even for our main e-commerce client and this adapter can have an instance of payPalPayment which can call the main
makePaymentUsingPayPal of our third party inside the processPayment method which it will override of our PaymentGateway
interface.

This is adapter design pattern

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


4) **Bridge design Pattern:**

Bridge patterns are simple are easy to understand, let understand this situation in which we have multiple
brands of Tv like say, samsung, sony, Mi etc. There exists a single remote which is capable of working with
any Tv brand, the client has access to remote and wants to use this remote for multiple Tv brands, here the bridge
pattern will come into picture.

A bridge pattern provides a bridge between abstraction and implementation, in this case remote is abstraction
and implementation is tv so we are trying to decouple abstraction from implementation.

Lets understand it better with help of an example:

There can be multiple brands of Tv like samsung, Sony ,Lg, Mi etc, so first we created a Tv interface and every brand
can provide its own set of implementations that how it wishes to work. Every Tv brand has its own implementation and
this is what we refer by implementation in the phrase "decouple abstraction from implementation"

Now remote should not directly depend on any of implementation thus decouple will happen.
In oder to achieve this we created a abstract class remote which takes a reference of Tv interface, since all the brands
which implements this interface can be considered as reference of Tv, thus we can see that remote is not directly
depending upon any specif implementation and thus we have provided a bridge between implementation and abstraction.

This bridge is basically this reference of Tv which is marked in abstract class remote.

Now a basic Remote can extend this abstract class and take a reference of any Tv
and can call methods of Tv interface using the this reference which will internally call the specific 
implementation.

The user can create an instance of basic remote and can pass any reference of any Tv brand, and it will work fine
with it.

interface Tv {
    turnOn(): void;
    turnOff(): void;
    changeChannel(id: number): void;
}

class SamsungTv implements Tv {
    turnOn(): void {
        console.log("Turning samsung Tv on")
    }
    turnOff(): void {
        console.log("Turning samsung Tv off")
    }
    changeChannel(id: number): void {
        console.log(`Changing channel of Samsung Tv to channel number: ${id}`)
    }
}

class SonyTv implements Tv {
    turnOn(): void {
        console.log("Turning sony Tv on")
    }
    turnOff(): void {
        console.log("Turning sony Tv off")
    }
    changeChannel(id: number): void {
        console.log(`Changing channel of sony Tv to channel number: ${id}`)
    }
}

abstract class Remote {
    protected tv: Tv // this acts as a bridge for remote with different Tv's

    public constructor(tv: Tv) {
        this.tv = tv;
    }

    abstract turnOn(): void;
    abstract turnOff(): void;
    abstract setChannel(id: number): void;
}

class BasicRemote extends Remote {

    constructor(tv: Tv) {
        super(tv);
    }

    turnOn(): void {
        this.tv.turnOn();
    }
    turnOff(): void {
        this.tv.turnOff();
    }
    setChannel(id: number): void {
        this.tv.changeChannel(id);
    }
}

let samsungTv: Tv = new SamsungTv();
let sonyTv: Tv = new SonyTv();
let basicRemote: BasicRemote = new BasicRemote(samsungTv);
basicRemote.turnOn();
basicRemote.turnOff();
basicRemote.setChannel(2);

basicRemote = new BasicRemote(sonyTv);
basicRemote.turnOn();
basicRemote.turnOff();
basicRemote.setChannel(2);


5) **Composite design Pattern:**

Composite design pattern is used where there is some kind of hierarchy for ex say a tree structure which we needs 
to represent amongst classes.

So a tree structure looks like 

                              root
                     |                    |
                   child                 child
           |                 |        |
          child            leaf       leaf
     |           |
    leaf         leaf

Now the root in composite design pattern is known as component and the child is known as composite. Leaf remains as leaf.

Lets understand composite design pattern better with help of a situation, suppose we need to design a
folder structure where there will be a main root folder, then multiple folders can be a part of it.

A folder can contain a file or can contain multiple folders again inside it.
A folder in this case is composite whereas a file is a leaf.

If we need to design such situation we can use composite design pattern.

Lets understand this with help of code.

So we wish to create a file/Folder system . A folder/file system can have multiple folders or multiple files or 
even single folder or single file etc nested within itself.

So we create a FileComponentSystem interface which is created to create reference of a file or a folder.

Now we have a file class which implements FileComponentSystem and thus can act as a reference of FileComponentSystem.
Now a file can have a name and thus this name is passed as parameter to constructor by user and is set to instance variable
of the file class. The file class also provides implementation of showDetails method which show the fileName.

Now we can also have a Folder class, a folder can have a name and it can have multiple files or even multiple folders within it
and thus it will have a array of FileComponentSystem, It implements the FileComponentSystem interface and thus can act as a reference
for it.

Now it provides declaration to showDetails method which iterate over the array of FileComponentSystem, every element of FileComponentSystem
is either a File reference or a Folder reference and thus we can call showDetails method over it.

Now we can add FileComponentSystem reference to Folder class using addComponent which pushes FileComponentSystem reference to the
array, we can even remove a FileComponentSystem reference from the array using removeComponent using 
this.components = this.components.filter((val) => val !== component);

So now we can test it saying we have 7 files of myImages like 1.png etc which are added to a folder named "images" using

let f1 = new Files("1.png");
let f2 = new Files("2.png");
let f3 = new Files("3.png");
let f4 = new Files("4.png");
let f5 = new Files("5.png");
let f6 = new Files("6.png");
let f7 = new Files("7.png");
let folder1 = new Folder("MyImages");
folder1.addComponent(f1);
folder1.addComponent(f2);
folder1.addComponent(f3);
folder1.addComponent(f4);
folder1.addComponent(f5);
folder1.addComponent(f6);
folder1.addComponent(f7);

Similarly we have say 4 eduction pdf's like Math.pdf etc and we add it to folder Education

let eduf1 = new Files("Maths.pdf");
let eduf2 = new Files("Cs.pdf");
let eduf3 = new Files("Ece.pdf");
let eduf4 = new Files("Civil.pdf");

let folder2 = new Folder("Eduction");
folder2.addComponent(eduf1);
folder2.addComponent(eduf2);
folder2.addComponent(eduf3);
folder2.addComponent(eduf4);

Now we can add both these folders in a main root folder using
let root = new Folder("root");
root.addComponent(folder1);
root.addComponent(folder2);
Similarly we can perform other operations also

Thus we have designed a folder system using Composite design pattern, lets understand how it is following a composite design patter,

FileComponentSystem acts as main root of tree and a common interface or entry point in tree and can also be understood as component.
File class acts as a leaf as no new hierarchy develops from it and this its a leaf and it implements FileComponentSystem.

Folder class acts as composite as it contains array of FileComponentSystem which can be both file or folder and thus resembles
hierarchy and also implements FileComponentSystem.

Lets understand it with help of code:


interface FileComponentSystem {
    showDetails(): void;
}

class Files implements FileComponentSystem {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    showDetails(): void {
        console.log(`File details are : ${this.name}`)
    }
}

class Folder implements FileComponentSystem {
    name: string;
    components: FileComponentSystem[];

    constructor(name: string) {
        this.name = name;
        this.components = [];
    }

    showDetails(): void {
        console.log(`Folder: ${this.name} \n`);
        for (let detail of this.components) {
            detail.showDetails();
        }
    }

    addComponent(component: FileComponentSystem) {
        this.components.push(component);
    }

    removeComponent(component: FileComponentSystem) {
        this.components = this.components.filter((val) => val !== component);
    }
}

let f1 = new Files("1.png");
let f2 = new Files("2.png");
let f3 = new Files("3.png");
let f4 = new Files("4.png");
let f5 = new Files("5.png");
let f6 = new Files("6.png");
let f7 = new Files("7.png");

let folder1 = new Folder("MyImages");
folder1.addComponent(f1);
folder1.addComponent(f2);
folder1.addComponent(f3);
folder1.addComponent(f4);
folder1.addComponent(f5);
folder1.addComponent(f6);
folder1.addComponent(f7);

let eduf1 = new Files("Maths.pdf");
let eduf2 = new Files("Cs.pdf");
let eduf3 = new Files("Ece.pdf");
let eduf4 = new Files("Civil.pdf");

let folder2 = new Folder("Eduction");
folder2.addComponent(eduf1);
folder2.addComponent(eduf2);
folder2.addComponent(eduf3);
folder2.addComponent(eduf4);

let root = new Folder("root");
root.addComponent(folder1);
root.addComponent(folder2);

console.log("Before removing folder")
root.showDetails();

root.removeComponent(folder2);

console.log("After removing folder")
root.showDetails();



6) **Flyweight design Pattern:**

Flyweight design pattern is used when we need to reduce memory usage and improve performance while dealing with large number
of mostly similar objects. It does so by sharing largely all common features of an object instead of creating duplicates again and
again.

Its generally used when we have n number of mostly similar objects where n is very large.

The properties / features which remains common amongst objects are know an intrinsic state, where as the properties which
differ are Extrinsic state.

Lets understand this with help of a situation.

I have a code editor and in the code editor multiple characters can be typed, however these different characters can have different font
styes like say different font family, different font size, different font color.

We need to implement such type of functionality, here there can be huge number of characters and it might be possible that many characters
can be using the same font style i,e font size, font family, color so if we use fly weight pattern to design this, it will help in memory
usage and we don't need to repeat multiple objects with mostly all same properties. 

These properties which can remain same in this case are font size, font family, color thus they will be our intrinsic state, whereas
the characters will differ thus they are Extrinsic state.

Lets understand this fly weight design pattern better with help of code.

The main idea here is that if in case we found same intrinsic properties being used again by some other character for which we have already
created an object for we don't create a new object rather pass the same reference of older object to this new character.
In case we are encountering these intrinsic properties for the first time then we create a new object and pass its reference to this character.

In order to achieve this we have a FontFactory which takes care of object creation.
Our fontFactory has a static map of string -> object of Font.
This map since is static remains same for all objects of FontFactory.

The key can be formulated via let key = `${fontFamily}_${fontSize}_${color}` i,e string concatenation of intrinsic properties.
Now in this map if this key does not exists this means we are encountering these intrinsic properties for the first time and thus we will
create a new object of Font and will place it against this key in map.

So in our use case doc.addCharacters("H", "Arial", 12, "Black");
we encounter key "Arial_12_Black" for first time and thus created a new object of Font using these properties and placed in map
so our map looks like 

Map: {

"Arial_12_Black": Font { fontFamily: 'Arial', fontSize: 12, color: 'Black' }

}

Now when we encounter doc.addCharacters("e", "Arial", 12, "Black");

so this key "Arial_12_Black" was already present in map and thus we don't create a new object of font rather pass the old
reference of the previous object only to this.

This happens inside getFonts function of FontFactory.

Now let come back to FontStyle interface this interface has three intrinsic states i,e fontFamily, fontSize and color and has a declaration 
of apply method.

We have a flyweight class called Font which implements this interface and is needed for object creation via help of intrinsic states only
i,e fontFamily, fontSize and color which are passed as arguments to its constructor.

This flyweight class implements applyMethod which apply these properties to the character.

Now lets see how our client can use it so we have a documents class, this documents class has a private characters array 
characters: { char: string, font: FontStyle | undefined }[] = [];

it is an array of object where each object has the character which we want to apply the font on and its corresponding mapping with
the Font class object. Since font class implements font style thus we can say that each object has the character which we want to apply
the font on and its corresponding mapping with the FontStyle reference.

This array gets formulated in addCharacters method of documents class, 
when we add a character with specific font it calls FontFactory'S getFont method, if the same fontStyle is already present in memory
it gives back the object of Font class, this object is mapped with the character and pushed to array, if it finds the font provided by
user for first time, the fontFactory creates the object and pass that reference to it and this new object gets mapped to this character
along with this new object reference.

The characters array looks like:

[
  {
    char: 'H',
    font: Font { fontFamily: 'Arial', fontSize: 12, color: 'Black' }
  },
  {
    char: 'e',
    font: Font { fontFamily: 'Arial', fontSize: 12, color: 'Black' }
  },
  {
    char: 'l',
    font: Font { fontFamily: 'Arial', fontSize: 12, color: 'Black' }
  },
  {
    char: 'l',
    font: Font { fontFamily: 'Arial', fontSize: 12, color: 'Black' }
  },
  {
    char: 'o',
    font: Font { fontFamily: 'Times New Roman', fontSize: 14, color: 'Blue' }
  },
  {
    char: '!',
    font: Font { fontFamily: 'Times New Roman', fontSize: 14, color: 'Blue' }
  }
 ]

for the given set of use cases. 

Now the render method inside the document class will simply iterate over the characters array and will call the apply method
of Font class which it has over ridden through interface FontFamily and will apply the font family, font size and color respectively to the
char.

Thus flyweight pattern helps memory optimization by only creating objects whose intrinsic state is being encountered for the first time.


The code implementation is as follows:

interface FontStyle {
    fontFamily: string;
    fontSize: number;
    color: string;
    apply(char: string): void;
}

class Font implements FontStyle {
    fontFamily: string;
    fontSize: number;
    color: string;

    constructor(fontFamily: string, fontSize: number, color: string) {
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.color = color;
    }

    apply(char: string): void {
        console.log(`Applying font to ${char} , Font Family: ${this.fontFamily}, Font Size: ${this.fontSize}, Color: ${this.color}`);
    }
}

class FontFactory {
    private static fontMap: Map<string, Font> = new Map<string, Font>();

    static getFonts(fontFamily: string, fontSize: number, color: string): Font | undefined {
        let key = `${fontFamily}_${fontSize}_${color}`;
        if (!this.fontMap.has(key)) {
            console.log(`Creating a new font: Font Family: ${fontFamily}, Font Size: ${fontSize}, Color: ${color}`)
            this.fontMap.set(key, new Font(fontFamily, fontSize, color));
        }
        return this.fontMap.get(key);
    }
}

class Documents {
    private characters: { char: string, font: FontStyle | undefined }[] = [];

    addCharacters(char: string, fontFamily: string, fontSize: number, color: string) {
        const font = FontFactory.getFonts(fontFamily, fontSize, color);
        let obj = { char, font };
        this.characters.push(obj);
    }

    render(): void {
        for (const { char, font } of this.characters) {
            font?.apply(char);
        }
    }
}

let doc = new Documents();
doc.addCharacters("H", "Arial", 12, "Black");
doc.addCharacters("e", "Arial", 12, "Black");
doc.addCharacters("l", "Arial", 12, "Black");
doc.addCharacters("l", "Arial", 12, "Black");
doc.addCharacters("o", "Times New Roman", 14, "Blue");
doc.addCharacters("!", "Times New Roman", 14, "Blue");

console.log("Rendering document");
doc.render();


7) **Proxy design Pattern:**

Proxy design pattern is used when we need to substitute the main object with another proxy object,
the role of this proxy object can may be to provide access to this main object, or to delay the object
creation etc.

Lets understand this with help of an example, say I have a file system such that only specific role
users can open the file. In this situation we provide a proxy object to the main file and check if the
user is authorized to open the file or not, if not he simply will not be given access to open the file.

Lets see the code for this

So we have a interface FileOperations which has a method declaration for openFile now we have a fileSystem 
which is the main object and it implements the interface FileOperations.
It takes a fileName and open it in openFile method, however since we need role based authorization on this main
object therefore we will be using proxy design pattern, and thus we have created a FileSystemProxy class which
also implements FileOperations, in this case it needs a fileName as well as user role to operate , it provides
definition to openFile method and checks if the user is authorized it he is not authorized, it will simply
return with unauthorized however if its authorized this means it needs to call openFile method of mainObject like
file system and thus we need a reference of fileSystem also in in this proxy class and using it we called
the main objects openFile method. 

Code starts here:

interface FileOperations {
    openFile(): void;
}

class FilesSystem implements FileOperations {
    fileName: string;

    constructor(fileName: string) {
        this.fileName = fileName;
    }

    openFile(): void {
        console.log(`opening file ${this.fileName}`);
    }
}

class FileSystemProxy implements FileOperations {
    private fileName: string;
    private role: string;
    private fileSystem: FilesSystem | null = null;

    constructor(fileName: string, role: string) {
        this.fileName = fileName;
        this.role = role;
    }

    openFile() {
        if (this.role !== "admin") {
            console.log(`The user is not authorized to open the file ${this.fileName}`);
        } else {
            if (!this.fileSystem) {
                this.fileSystem = new FilesSystem(this.fileName);
            }
            this.fileSystem.openFile();
        }
    }
}

let fileSystem: FileOperations = new FileSystemProxy("systemDesign.pdf", "admin");
fileSystem.openFile();

fileSystem = new FileSystemProxy("systemDesign.pdf", "guest");
fileSystem.openFile();
