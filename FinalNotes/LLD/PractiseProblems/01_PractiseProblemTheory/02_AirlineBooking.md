2) **Airline booking system:**

The problem is to create a airline booking system, for example when we search for flights in 
pay tm or say amazon flights or say sky scanner.


A system design consist of 5 major steps which have been given in detail while solving Book my show design problem.

a) Gather all requirements
b) Create use case diagram (System high level understanding)
c) Create class diagrams (Low level/ depth understanding of the system)
d) Create skeleton code
e) Complete code implementation.


**Gather all requirements:**

1) There can be two type of user in our app
     1.1 User
          - Registered
          - Unregistered
  
     1.2 Flight Providers
          - Registered
          - Unregistered

2) Registered User:
          - Login
          - Search flight
          - Book flight
          - Cancel Booking of flight
          - View booking details

3) Unregistered user:
          - Register
          - Search flight

4) Registered Flight Provider
          - Login
          - Add a flight
          - Update a flight
          - Search for a flight
          - View all bookings for a flight
  
5) UnRegistered Flight Provider
          - Register


**Use case diagram**

Basic use case diagram looks like: ![alt text](../LLD/PractiseProblems/02_AirlineBookingSystem/Diagrams/UseCaseDiagram.png)

Based upon the requirement gathering, we have come up with the above use case diagram.


**Class diagram**

After understand this scenario we will be proceeding with the class diagram.

So the class diagram looks like:

FinalNotes\LLD\PractiseProblems\02_AirlineBookingSystem\AirLineBooking.drawio.html

Lets understand this, so two actors can act on our system i,e the flight providers and the users.
Both flight providers can be registered as well as un registered. Registered flight providers can Registered user
both can login whereas a un registered flight provider and user can register in the system.

For an unregistered flight provider the register needs admin approval, whereas in case of un registered user registering
we can do some validations like user does not already exists in the system.

We can have one abstract class user which will be extending by both registered user and un registered user.
In the same way an abstract class for flight provider which will be extended by both registered flight provider as well
as unregistered flight provider.

The login process for both registered flight provider and unregistered flight provider can be done say in 3 ways
auth login, gmail login or OTp based login, thus we have a interface login which will be implemented by 
registered user as well for registered flight provider.

Three classes i,e AuthLogin, Gmail Login and OTP login will also implement the Login interface.
The login method inside each classes like Gmail, OTP or auth login can implement their own functionality of login
whereas the login function inside the registered user and registered flight provider can take an argument of login
which via dynamic method dispatch will be calling the respective Gmail or OTP or Auth login class.

Registered user can perform  operations like 

Login, bookFlight, getBookingDetail, showAllBookingHistory, cancelBooking which will be a part of interface
regUser interface and regUser can implement it.

Similarly a regProvider can perform operations like

Login, addFlight, updateFlight, cancelFlight, viewAllBooking which will be a prt of regProvider interface and
regProvider can implement it.

The main goal to make these functions implement via an interface is to promote extensibility.

Now similarly we can have actions for unreg user and provider like register which can be part of separate
interfaces and the respective class can implement it.

Now we need a flight class which represent an entity of a flight.

It can have instance variables like

id: string;
source: string;
destination: string;
schedule: Date;
availableSeats: number;
flightProvider: FlightProvider;
price: number;
bookings: Booking[];

Now we will implement bookFlight, CancelBooking, viewAllBookings, cancelAllBookings/cancelFlight
inside this class.

This class has a relation with booking class as booking class is responsible for generation of a ticket
Thus a booking class can have members like

pnr: string;
flight: Flight;
user: User;
amount: number;
isCancelled: boolean = false;
numberOfSeats: number;

Reg user and reg provider have relation with flight class as they both need to call flight class methods to
get their respective work done.

Now user has the responsibility of selecting the payMentMode, thus we create a payment interface which can be
implemented by various different payment classes like CreditCard, DebitCard, Paypal etc.

The booking class also has a relation with these payment classes as it takes an type of payment which ticket  creation
and via dynamic method dispatching calls the pay method of that class respectively.


This design could have been further improved by addition of airport module and more detail in payment status like
processing, pending etc.