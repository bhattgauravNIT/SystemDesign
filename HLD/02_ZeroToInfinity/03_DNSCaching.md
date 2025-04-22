**DNS caching**

Now every time the client makes a request its not a great idea to always ask the local resolver(Present in Os)
to connect to recursive resolver (present in ISP'S infra or public DNS provider) to connect with DNS servers
and resolve the domain name.

So in order to overcome this lookup every time the client makes a request, there is a concept of DNS caching.

These caches can be stored in multiple layers like

a) Clients browser
b) Os
c) ISP’s DNS resolver or any public resolver (like Google DNS) caches results for many users.

These caches can be stored for a TTL (time to live) after that these cache are expired or removed.

Now these DNS cache can have many type of NS(name server) records 

1) A -> Stores IPV4 address for named domains
2) AAAA -> Stores IPV6 address for named domains
3) CNAME -> connanical name like www.google.com and google.com are same
4) MX( mail exchange ) record -> Specifies the email server responsible for receiving email corresponding to a domain
5) NX record -> Specifies the authoritative server corresponding to a domain name
6) Text record -> Stores text data corresponding to a domain name.


If the user clears the cache of his browser then before the TTL even these DNS cache can get removed.

In order to see DNS browser cache we can go to chrome://net-internals/#dns and
input the domains for which we need to see IP's for.


We can see cache in network (developers tool)

app.js       58 KB     (from disk cache)
style.css    30 KB     (from memory cache)
logo.png     12 KB     12 KB


from disk cache means it was cached in our hard disk/ssd
from memory means it was cached in our RAM
logo.png is freshly downloaded.


Amazon cloud's Route 53 is a DNS web service provider hosted on cloud which can help creating host zones i,e
zones where we can map our domain with some IP'S of different types of Named servers like A, AAAA etc.