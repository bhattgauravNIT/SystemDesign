**Security**

Security in terms of system design refers to the architectural tool which ensures our application to be safe
in prospective of data, resources, malicious attacks, authorized access.

There are some key components of security like

1) Authentication
2) Authorization
3) Encryption
4) Network security


**1) Authentication**

Authentication refers to verifying the identity of the user, in simple words its the process to get to know
that the user is actually whom its claiming to be.

Authentication can happen via several ways like

**Email/password or username/password based authentication**

The users puts in his email and password and its validated against the user say in some auth DB.

**Multi factor authentication**

Suppose after entering email and password, an OTP is sent to the registered mobile
number such scenario is considered as MFA or multi factor authentication.

**OAuth (Open authentication)**

Its allows application which the user is trying to enter, to get data of the user
from other service provider like say login in via gmail, here the password is not shared to the main application 
which is requesting data.

Consider an example, i opened an website like say cred it asked to how you want to login, i choose say gmail, now i am being redirected to gmail, i logged in inside gmail and now i gave consent to share my data with that app, gmail sends back an code
which is temp to the main app and i get redirected back to cred.

Now cred servers use this code to hit an post api to google called google token end point with the code.
Google sends back an auth token say a bearer auth token, now app request again google api's to get user info
via this token, the app gets the user info and lets him login in the system.

So Oauth works with token.

**SSO (Single sign on)**

Its an centralized authentication managed by IDP i,e identity provider like OKTA, so for example if you login inside gmail than you can
also simply access goggle sheets, docs etc without need to sign in again, as a centralized place checks your
identity and provides a token, when we enter other apps, it checks your token and allows you to sign in.

OAuth and SAML are two protocols which are used in SSO.


SSO with Oauth protocol:

It works exactly similar as explained above in O auth , if user say it wants to login via gmail them google which owns 
gmail acts as IDP i,e identity provider and send access token to the application which helps in authentication of the user.
Oauth works with token.


SSO with SAML protocol:

Suppose we work in a organization and we started our day, initially we are logged out, tried to access say tfs jupiter, 
it redirects us to an login which is an IDP(identity provider) login, it asks your username and password , now it authenticates 
you and send back a SAML assertion which is a XML based doc, to the tfs jupiter, it lets you in, now you don't need to
login again to any other apps like teams, outlooks etc as your identity will be verified via this SAML assertion as it is 
accepted by all the apps of your organization.  

So SAML works with digitally signed xml based doc.

**2) Authorization**

Authentication was simply confirming the identity of the user where as authorization refers to verify wether the user
is permitted to perform the action which its requesting for. Like in amazon if i m logged in as a customer than i m not
authorized to sell products.

Authorization can be role based or even attribute based like say type===customer etc.


**JWT (JSON Web token) based authentication & authorization**

As mentioned that OAUth works with tokens, so one of the most commonly used token in JSON web token also called as JWT token.
A typical JWT token looks like

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. 
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNoaWNoYSIsImlhdCI6MTUxNjIzOTAyMn0. 
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

Its separated by 3 dots where each part before dot has some significance.

The first part i,e eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 is the header of the token which contains encrypted metadata regarding
the encryption algo which is being used like SHA256 etc, and the type of the token like say a JWT.

The second part is payload so eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNoaWNoYSIsImlhdCI6MTUxNjIzOTAyMn0 contains the encrypted
info about the user like username, issuing time, expiry time, role.  Role can be further used for authorization.

The third part is signature, and this is used to verify that this token is not altered and is issued by a trusted source.


Lets understand the flow, say the user submits its user name and password , it goes to server say server validates it with
authDb or some IDP like okta or google etc,
its verified and thus the server creates a JWT token,  now this JWT token is send back to client and is stored
in local storage or some secured cookies, now the user makes subsequent request to the server for some other services,
all these request and sended along with the token may be as a header, the server checks the expiration of the token, if token is valid and 
the user has the necessary role to perform that operation, the server responds back. 


**3) Encryption**

Encryption refers to the concept of encrypting data i,e converting plain text to cipher unreadable text.

The main difference between hashing and encryption is , say once we send a message so it gets sended as encrypted and then is decrypted
at other end, so that no malicious attack can happen over the network on it, whereas hashing means to convert th data for data integrity
example the password of a user is hashed and stored in db so that even db admin cant see the original password.

Moreover data encrypted can be decrypted back however data hashed can't be un hashed or resolved to original again. The same hashing
technique over the data would again give the same hash and thus can be validated with original data's hash.

Some hashing techniques are SHA-256 whereas encryption is AES, or SSL/TLS.

Encryption can happen over few stages:

**a) At rest:** 

Say we have a credit card dbms, so the credit card details which are at rest and stored in db can be encrypted so that even if the
database is compromised than even the data will not be compromised as its encrypted.

**b) In transit**

When the data is transferred over the network say from client to server or server to client its encrypted via say HTTPS using protocols
like TLS/SSL, this helps in data authenticity and secure communication.

**c) Field level**

In some field level encryption only some sensitive fields are encysted which may be crossing over network or even in rest state.



**4) Network security**

Network security is very important to make networks secure. Lets take a case that we are storing data inside cloud say AWS, now
if this network of AWS is not secure, say any IP comes and asks for data for its not like that this data will be provided and
moreover some restrictions on networks needs to be imposed to accept or reject which ip's or ports. This all comes under network
security.

**a) Firewall:**

Firewall can be used for network security, which permits or denies ip's looks for malicious attacks based upon pattern and acts
as a barrier between trusted and untrusted external networks.

**b) VPN:**

Say an employee is working away from office and is not in secure network, thus with help of Virtual private networks he
can access the company resources. So a request is sent to a service which authenticates this network and allows access to the main
network.

**c) Intrusion detection**

This helps detecting malicious activities based on patterns and past experience.