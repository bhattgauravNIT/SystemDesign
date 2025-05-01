**Queueing mechanism**

Queueing mechanism refers to the concept in which two or more services can communicate to each other asynchronously.

Lets consider an example, when we send message on whatsapp it might be possible that the receivers
system is not connected to internet, thus the message might not delivered instantaneously, so what happens
we sent a request to server, it pushes it to queue, queue waits for acknowledgement from the receiver , once acknowledgement
receiver based upon the architecture might delete it from the queue. 

Lets understand a queueing system:

                   msg                                      msg
Publisher   ------------------------------> Broker    ----------------------------> Subscriber

A publisher publishes a message/topic to a broker which acknowledges it, act as temp storage, once subscriber is ready sends it to
subscriber, subscriber after processing the message acknowledges to broker, which based upon requirement can either drop the message
or sends confirmation to publisher.

So broker is the service in between the publisher and the subscriber which is responsible for handling these
asynchronous request from the publisher to the subscriber.


Lets understand more scenarios where such system can be used.

Say i have an application in which i ask for signUp, here the user needs to provide the basic info about itself like
say username, password, email, address and a profile picture. Now once he saves his profile, the request goes
to the server. So the server as this point has to do a lot of jobs like storing info in DB, processing the profile 
picture as say it need to convert it to 30*30, even send an email to user welcome onboard etc.

This is a tedious job for the server and thus creating a profile can take forever. Thus suppose in our architecture
we have assigned different task to different services, like one service to store data to DB, one service to process the image,
one service to send email .

Now we generally see that email might takes few seconds to come after creating profile, it can be because the main service 
which the server sends request to after successful storing data in db, sends msg to a broker and this broker is connected
to say aws email service, thus these two services communicate with other other asynchronously.

Similarly the profile picture 30*30 processing say is handled by some other say a 3rd party service, again this queue/broker
helps in talking asynchronously.



Thus where ever two or services need to communicate to each other and we can afford asynchronous communication, then this
queueing system architecture can come into picture.


**Disadvantages**

Although the asynchronous communication can happen between two services which serves as advantage using this queueing system however,
there can be some disadvantages also which this.

a) Consider a scenario that publisher is very fash in publishing messages to the broker however the rate of consumption
or message processing is slow by the consumers. Thus since broker is a temp storage so it has some storage related limitations 
once it overflows then problems happens.

There are solutions to such problems.
1) Once over flow situation is reached, the broker can drop the messages, so if the business is okay with it, this behavior of broker
   can be adapted.
2) We can provide a larger buffer/resources to the broker so that it can queue up more data. It obviously adds up to the cost.
3) The broker can apply back pressure to the publishers, i,e once the broker has reached a threshold it can apply pressure back to
   publisher to lower the rate of message publishing or to even halt it for temporary basis, in order to provide the consumers time
   to process the message.

b) The broker crashes

Now in case the broker itself crashes then there is a possibility that the entire system can go down, in such scenarios similar
techniques like database replication can be taken into consideration like having many brokers, so if one went down load can be
transferred to other brokers.

c) Head of line blocking

Lets understand that at current T time, there are p1,p2,p3....pn packets in broker queue. Now pq is at front of queue and suppose
the consumers failed to process this packet which can happen due to n number of reasons. Now till it gets processed rest 
p2,p3.....pn packets will get stuck due to head of queue blocking the line.

This situation can be overcome by:
1) Proving a retry configuration at max number of limits, once that retry is reached the broker can either drop the packet/topic
   or can send it to dead letter queue. Dead letter queue contains corrupt packets/topics/request.
