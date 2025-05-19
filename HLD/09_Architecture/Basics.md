**Achitecture**

Systems can have different types of architecture like say a monolith, microservice or server less architecture. Each of these
architecture has there own merits and demerits. Lets see them one by one.

**Monolith architecture**

A monolith architecture is one in which all the modules lies in a single code base and are generally tightly coupled.
Say for example, we have zomato and we are designing it in a monolithic way so it can have various modules like say payment module,
user module, search module, delivery module, status module etc. All these modules will lie in a single code base and will be deployed 
as a single unit. Now if any change needs to be done say in delivery module for a new feature, the entire app needs to be deployed.

Testing becomes difficult as there will always be chances of one functionality breaking other as everything is tightly coupled.
Deployment is relatively easy as we deploy it as a single unit, however since its a single unit thus modernization becomes difficult
say for example single unit code base will all be in one language only, now say we know our delivery module is resource extensive 
and also it needs to work very fast, if all code base say is written in java, then we cant rewrite delivery module in go lang later on.

Moreover say entire application is a single unit and thus interacts with a code base say mysql, but however say our search module can become
pretty fast in case a different database is used in it like say elastic search, now this can't happen as application is itself a single
unit.

Sometimes, say there are high loads are its specific on say search, so since application as a whole is a single unit and thus
we don't have the leverage to scale up only search module, and thus the entire application needs to be scaled up.

Moreover in case deployment fails then there is always a chance of the entire application to come down rather than only few services.

**Micro service architecture**

A micro service architecture as name suggest, is a architecture in which different modules acts as different code bases and a separate service.
These are deployed independently.

Lets take an example of zomato over a micro service architecture.

So we can have different micro services inside zomato like payment service, order service, message service, user service, search service etc.
In this case if any service needs a different type of database then that service can independently use that particular database even.
These service as a single unit on their own and can be managed by different small teams. These services can be scaled up and down in terms
of resources accordingly and are independently deployable.

However there can arise some challenges with micro service architecture, sometimes, these services needs to communicate with each other
so a specific request, so say for a specific request data needs to be updated in two microservices like say order service and payment service.
Thus there can be a latency as inter service calls are happening moreover data inconsistency needs to be taken care of.

Moreover more cross team collaboration is needed in case of using micro service architecture as one changes in service can impact the other service too.

However its better as compared to monolithic architecture but still it depends upon use case to use case.


**Server less architecture**

Lets consider an example to understand serverless architecture. Say we are creating an application which will just authenticate and authorize the user and logs them in. Now instead of we creating a server which will store user info in userDB , it validates and then generate a JWT token and
then logs him in, we simply use a cloud provider say Amazon cognito, now its the responsibility of the cloud to handle, once user request for login, we will trigger a event to this cloud provider and it will do the job for us. Its on paid basis and gets scaled up as per number of
users by the provider, we don't need to do anything just pay more.

Some more examples can be image processing site, which stores user image in a s3 bucket and then when the user wants it back we just
have our logic to resize it and give him back. We don't want to handle the overhead of storing the images in form of pixels in our db and
just want someone to provide us this service, similarly can be done for messaging service.