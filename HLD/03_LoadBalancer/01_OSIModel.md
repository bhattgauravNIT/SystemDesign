**OSI Model (Open system interconnection model)**

OSI model (Open system interconnection model) is a theoretical framework which is used to standardize how
different networking system communicates with each other. It divides the communication into 7 different layers where each layer has its own functionally.


1) **Application layer(Layer Number: 7)**

It is closest to the user and top most layer in OSI model. Its the place where the user interact with the
network via some interface, browser etc. So the user wants to connect to www.google.com and thus he interacted
with browser to do so, so browser is our application layer.

And at application layer the browser interacts with the web server.

The protocol that can be used is HTTP or HTTPS.


2) **Presentation layer (Layer Number: 6)**

Presentation layer is like a translator which ensures that the data sent by application layer of one
system can be understood by application layer of another system.

Lets suppose we are trying to access a secure website through HTTPS, and we want to say
search for google, so the request which we may be sending or may be the response coming back from the server
will be encrypted in presentation layer

HTTPS = HTTP + (SSL/TLS)

i,e HTTPS = HTTP + (Secure socket layer/Transport layer security),

This encrypted data will then be decrypted at the receivers side or the server side.


3) **Session Layer (Layer number 5)**

A session layer is responsible for starting, managing and ending communication session between the browser
and the server.


4) **Transport Layer (Layer 4)**

The data or the request can be huge (in form of (0's & 1's) so its the responsibility of the transport layer to convert this large chunk of data into smaller pieces called segments in case of (TCP) and data grams in case of UDP and make them reach in sequence for the user.
The port number for sender as well as receiver are assigned in this layer.

TCP and UDP are two protocols associated with transport layer 

TCP: Transmission control protocol is little slow compared to UDP but reliable , guarantees delivery and order

UDP: User data gram protocol is fast, un reliable, no guarantee of delivery and no order, its generally
used for streaming.

The role of assigning port to these segments is to help in identification of service/application.


5) **Network layer (Layer3)**

Consider network layer as GPS or navigator which helps packets find its destination.
The transport layer has converted all large chunk of data into small segment, network layer assign these
segments with some IP address for source and destination, basically it uses IP protocol to convert these segments of data
into packets and sent into the network with routing instructions.
Network layer helps packets reach the destination via best possible route.

The role of assigning IP is to help identify the device in the network.

6) **Data link layer (Layer2)**

The IP packets now coming via network layer are now wrapped into frames and sent to your local network (router or modem).
Network layer is responsible for assigning frame which includes the Mac address of your device,
mac address of the next hop and error checking happens.


7) **Physical Layer (Layer 1)**

Finally, the actual electrical signals or light pulses are sent through your Wi-Fi or Ethernet cable.


**Lets understand the entire e-e flow by taking an example:**

-7: I opened my browser and hit https://google.com, the browser initiates a request using HTTPS specifically ,
it needs the IP address of google.com and thus started DNS lookup. This all happened in Application layer.

-6: Now the browser has to send the data i,e request so it encrypts it via (TLS/SSL) since its HTTPS, compress the data ad sent it. It all has happened in presentation layer.

-5: Now there is a secure connection which is being made with google servers using TLS handshake,
this sessions is managed and maintained, This all happened in session layer.

-4: Now the request data which needed to be sent (ideally in 0's & 1's till this point of time) to server is broken down into small segments, uses TCP in this case to maintain safe, reliable and sequential data flow. A port number is assigned both of the source and the destination. This all happened in transport layer.

-3: Now these small segments are wrapped into a packet, an IP address is assigned for both source and destination.
Uses IP to find the best possible path for packets to reach destination, routers inspect and forward the packet
on assigned paths. This all happened in Network layer.

-2: Now this outgoing packet (with TCP+ IP address) is wrapped in a frame which includes the Mac address of your device,
mac address of the next hop and error checking happens. This frame is now sent over the network using local medium
like wifi. When the frame reaches your router the router checks the destination MAC. If the destination IP is outside
your local network (which Google is), the router Removes the old frame and Creates a new frame with Source MAC = router's MAC, 
Destination MAC = next hop (like another router or modem) and forwards the packet along the path to Google. this all happens in Data link layer

-1: Now the raw bits (1s and 0s) as electrical signals, light, or radio waves travels through cables or Wi-Fi through switches, routers, fiber optics, etc., to reach Google.


Note: encapsulation is when data is flowing from L7 i,e application layer -> L1 layer i,e physical layer seen in case of
request sent from client to server 

A situation of de encapsulation is when data is flowing from physical layer to application layer.










