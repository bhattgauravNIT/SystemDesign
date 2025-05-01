**Types of broker**

In general there are two type of brokers 

1) Queue brokers
2) Topics broker

**Queue broker:**

Suppose there are n number of publishers like p1,p2,p3,p4.....pn, at any current time in queue broker there are
n request like r1,r2,r3......rn and there are n consumers like c1,c2,c3.....cn. Now as soon as one request r1 is 
being handled or processed by a consumer c1 which it meant to relay to. So say publisher p1, is publishing messages r1,r3,r5 for consumer c1. So these messages can be consumed by c1 once it consumes r1, r1 is out of queue and so on.
This packet is considered resolved and will be out of queue.

So, each message in queue broker is relayed to only one consumer whom its intended for.

Ex: Rabbit MQ, SQS, queue in kafka.

**Topics brokers**

Suppose there are n number of publishers like p1,p2,p3,p4.....pn, at any current time in queue broker there are
n request like r1,r2,r3......rn and there are n consumers like c1,c2,c3.....cn. Now for a request r1, it will reach all the consumers
i,e c1,c2,c3.....cn then its taken out from the broker.

So reach message in topic broker reaches to all the consumers. Its like message broadcasting.

Ex: Mqtt Broker, SNS, topics in kafka


Note:

Once message is published and sent to broker and it acknowledges it keep it with it until no consumer subscribes to this broker.
Once the subscriber is attached, the broker send it to consumer based upon the type of broker either a queue or a topic broker.

These message are sent in flight to consumer, in case of queue broker if this message is not processed by consumer, it comes
back from message in flight back to queue. This can lead to head blocking problem for other other messages and thus the dead
letter queue needs to handle such things.