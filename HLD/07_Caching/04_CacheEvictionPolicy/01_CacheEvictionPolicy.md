**Cache eviction policy**

Since cache is a temporary storage, and its fast but it comes at a cost, so we should always maintaining only required
data according to cache size limitation for optimized cost and performance.

Thus cache eviction policies are those which are used to debarred data or remove data from the cache.

There are many cache eviction policies some of most common are:

**1) Random replacement**

Random replacement as word suggest refers to policy in which once ram size is reached or set threshold is reached we remove
random data from the cache.

Consider an array being used to cache data, and max capacity that we need to hold is 10, now 
as soon as the size or length of this array, breaches this 10 threshold we pick up a random index and
remove it from the array. Then we insert the new data inside it.

We need to perform this insertion and deletion in 0(1) and thats what makes cache fast.
Moreover the cache should also not contain duplicates as this is not optimal use of resources.

So in order to achieve this with help of an array, we have a map and a array.

We store value and their index in array inside a map.
In case a value is already present in map we don't insert it in array and thus avoid duplicates in array for
optimum utilization of cache space.

Now in case the length of array is lesser than capacity then simply we push to array in 0(1) and update map.
Now in case the length is getting greater than the capacity it can hold, we need to pick a random index using
let randomIndex = Math.floor(Math.random() * capacity);

Now this random indexed value is swapped with last value of the array, and then this value is popped out in 0(1)
the map is updated with new index value for the last element which got swapped.

Lets consider its implementation:

```typescript
/**
 * 0(1),0(n) where n is capacity of Cache we are designing
 * 
 * Implementation idea is to randomly find any index from the cache array,
 * swap it with last element and pop it in case of capacity of cache is exceeded.
*/
class RandomReplacement<T> {
    private arr: T[];
    private capacity: number = 10;
    private mp: Map<T, number>;

    constructor() {
        this.arr = [];
        this.mp = new Map();
    }

    insertData(val: T) {
        if (this.mp.has(val)) return;
        if (this.arr.length > this.capacity) {
            let randomIndex = Math.floor(Math.random() * this.capacity);
            let temp = this.arr[randomIndex];
            this.arr[randomIndex] = this.arr[this.arr.length - 1];
            this.arr[this.arr.length - 1] = temp;
            this.arr.pop();
            this.mp.set(this.arr[randomIndex], randomIndex);   
        }
        this.arr.push(val);
        this.mp.set(val, this.arr.length - 1);
    }

    showCache() {
        return this.arr;
    }
}

let randomReplacementCache = new RandomReplacement<number>();
randomReplacementCache.insertData(1);
randomReplacementCache.insertData(2);
randomReplacementCache.insertData(3);
randomReplacementCache.insertData(4);
randomReplacementCache.insertData(5);
randomReplacementCache.insertData(6);
randomReplacementCache.insertData(7);
randomReplacementCache.insertData(8);
randomReplacementCache.insertData(9);
randomReplacementCache.insertData(10);

randomReplacementCache.insertData(-1);
randomReplacementCache.insertData(-2);

console.log(randomReplacementCache.showCache());
```

**2) Least frequently used (LFU)**

This cache eviction policy as name suggest removes the least frequently used cache entry from the system.
So once the size or threshold value is reached we remove the least frequently used entry.

however there can be a problem with this LFU, say a new data comes in and its used only once, i,e the time
where it came inside cache, so in the eviction of the data, its a potential candidate to get eliminated from the
cache. Thus even a new data can be removed from cache using this eviction policy.

```typescript
/**
 * 
 * 0(1),0(n) where n is capacity of Cache we are designing
 * 
 * The idea is to maintain two maps, one with value -> frequencies.
 * 
 * Another with frequency -> Set of values having that frequency, so to handle values with same
 * frequencies.
 * 
 * A min freq variable which gives the min frequency in map in 0(1).
 * 
 * Say insert(1), the capacity was 3, 
 * in freq map we have {1,1}
 * in key map we have {1, Set<>{1}}
 * minFreq = 1
 * 
 * insert(2)
 * in freq map we have {{1,1},{2,1}}
 * in key map we have {1, Set<>{1,2}}
 * minFreq = 1
 * 
 * insert 2
 * in freq map we have {{1,1},{2,2}}
 * in key map we have {{1, Set<>{1}},{2,Set<>{2}}}
 * minFreq = 1
 * 
 * insert 3, case of overflow
 * evict the Least frequently used val
 * 1 is used least frequently 
 * in freq map we have {{2,2}}
 * in key map we have {{2,Set<>{2}}}
 * minFreq = 1, but in next iteration automatically sets to 1 as any new entry will 
 * come.
 * 
 * 
 * 
 */
class LFU1<T> {
    private capacity: number;
    private freqMap: Map<T, number>;
    private keyMap: Map<number, Set<T>>;
    private minFreq: number;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.freqMap = new Map();
        this.keyMap = new Map();
        this.minFreq = 0;
    }

    insert(val: T) {
        /**if capacity is 0 then LFU cache does have allocated space thus return */
        if (this.capacity === 0) return;

        /**if freq map has val already present then we need call edit map */
        if (this.freqMap.has(val)) {
            this.editMaps(val);
            return;

            /**if freq map does not contain val this means its a new entry  */
        } else {

            /**if LFU cache is not having capacity then evict Least Frequently used val */
            if (this.freqMap.size >= this.capacity) {
                this.evict();

                /**If LFU cache has space then add this element both in freqMap and keyMap */
            } else {
                this.minFreq = 1;
                this.freqMap.set(val, 1);
                if (!this.keyMap.has(1)) {
                    this.keyMap.set(1, new Set<T>());
                }
                this.keyMap.get(1)!.add(val);
            }
        }
    }

    private editMaps(val: T) {
        /**
         * update the freqMap with updated frequency for the val already
         * present in map
         */
        const freq = this.freqMap.get(val)!;
        const newFreq = freq + 1;
        this.freqMap.set(val, newFreq);

        /**
         *
         * keyMap will always contains the old freq as we ensure this during
         * putting entry in freq map that an entry is made in key map.
         * 
         * Now delete this val from the set corresponding to that old freq.
         * There can be one corner case here that the set becomes empty corresponding
         * to that old frequency, that we remove that key even and set the minFreq as +1.
         * Say at this time 
         * 
         * keyFreq = Map{{1,1}}
         * keyMap = Map{1,<1>}
         * 
         * now we again insert1 so 
         * keyFreq = Map{{1,2}}
         * keyMap = Map{2,<1>}
         * 
         * so min freq has to be 2 now.
         * 
         * 
         * Now for the new Frequency, the keyMap can have set of values corresponding to it
         * or not.
         * 
         * If not we enter a new set corresponding to this new freq.
         * If its there we update the set.
         * 
         * 
        */
        const oldSet = this.keyMap.get(freq)!;
        oldSet.delete(val);
        if (oldSet.size === 0) {
            this.keyMap.delete(freq);
            if (this.minFreq === freq) {
                this.minFreq++;
            }
        }

        if (!this.keyMap.has(newFreq)) {
            this.keyMap.set(newFreq, new Set<T>());
        }
        this.keyMap.get(newFreq)!.add(val);
    }

    private evict() {
        /** We need to evict the Least frequently val, so we find the least frequent
         *  used frequency in keyMap
         * 
         *  Remove the first element from the set.
         *  In case we only had one element in set, and we removed that so
         *  we also remove the key itself.
         * 
         * we also remove this entry from freq map.
         * 
        */
        const set = this.keyMap.get(this.minFreq);
        if (set) {
            /**Gives iterator over set */
            const iterator = set.values();

            /** gives first value in set*/
            const firstInserted = iterator.next().value;
            set.delete(firstInserted);
            this.freqMap.delete(firstInserted);
            if (set.size === 0) {
                this.keyMap.delete(this.minFreq);
            }
        }
    };
}
```

**3) Least Recently used (LRU)**

This cache eviction policy is based upon the recent usage, in case the cache capacity is reached
and eviction needs to happen than the lest recently used data point will be removed from the cache.

Its implementation is based upon doubly linked list.
Least recently used means the data which is present at end of the doubly linked list and thus its 
removed in case of eviction when the capacity is reaching.

So lets understand this, suppose in my cache a data points comes in and say initially
the cache was empty so i inserted it as head, we marked its entry in a map of value -> node.
Doubly linked list looks like:

[{prev:null,data:1,next:null}]

Now a new data comes in say 2 it was not present in map previously,
so its the most recent data and thus it gets inserted as head and entry is marked in map.
Doubly linked list looks like:

[{prev:null,data:2,next:1}] -> [{prev:2,data:1,next:null}]

Now say again a data comes in 3, it was not present in map previously,
so its the most recent data and thus it gets inserted as head and entry is marked in map.
Doubly linked list looks like:

[{prev:null,data:3,next:2}] -> [{prev:3,data:2,next:1}] -> [{prev:2,data:1,next:null}]

Now say again 1 comes in, so its also in the map, now we cut the connection of this node and
the node can be found via the map, and insert a new node with value 1 at head as now its the
most recent, and update the end.
Doubly linked list looks like:

[{prev:null,data:1,next:3}] ->[{prev:1,data:3,next:2}] -> [{prev:3,data:2,next:null}]

Say again 1 comes in, so 1 is already the most recent and hence we do nothing.

Now say the the cache capacity is reached, thus we simply remove the end of the DLL
in 0(1) as we are maintaining a end node as well for DLL.

```typescript
/**
 * 0(1),0(n)
 */

/**
 * Node class which creates a simple node with 3 things
 * a previous, a next and the data.
*/
class ListNode<T> {
    private data: T;
    prev: ListNode<T> | null;
    next: ListNode<T> | null;

    constructor(val: T) {
        this.data = val;
        this.prev = null;
        this.next = null;
    }
}

/**
 * Doubly linked list of nodes which has a head and a end.
 * 
*/
class Dll<T> {
    head: ListNode<T> | null;
    end: ListNode<T> | null;

    constructor() {
        this.head = null;
        this.end = null;
    }
}

class LRU<T> {
    private mp: Map<T, ListNode<T>>;
    private capacity: number;
    private dll: Dll<T> | null;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.mp = new Map();
        this.dll = new Dll();
    }

    insert(value: T) {
        /** if capacity of cache is 0 return immediately */
        if (this.capacity === 0) return;

        /**if map already contains the value, it means we need to cut the 
         * connection of this node and create a new node and mark it as head
         * of dll.
         * 
         * a) The node whom we need to cut connection is already at head, don't do anything
         * as its already head.
         * 
         * b) If node which we are cutting connection of lies at end of dll i,e node.next === null
         *    then cut connection and update the end as end = node.prev and insert new node with this
         *    value at head.
         * 
         * c) If node which we are cutting connection lies inn between somewhere, end will remain same,
         *    cut its connection, mark a new node with the same value at head.
         */
        if (this.mp.has(value)) {
            let node = this.mp.get(value)!;
            if (this.dll && node !== this.dll.head) {
                if (node.next) {
                    node.next.prev = node.prev;
                }else {
                    this.dll.end = node.prev;
                }
                if (node.prev) {
                    node.prev.next = node.next;
                }
                if (this.dll.head?.next === null) {
                    this.dll.end = this.dll.head;
                }
                this.insertAsMostRecentNode(value);
            }
            
        } 
        /**
        * If its a fresh entry
        */
        else {
            /**
             * If the capacity is reached, remove the least recent used i,e from the end of the 
             * dll and update the end
             */
            if (this.mp.size >= this.capacity) {
                this.evict();
            } else {
                /** 
                 * The cache has capacity thus simply insert the value at head as its most
                 * recently used.
                 * **/
                this.insertAsMostRecentNode(value);
            }
        }
    }

    showCache() {
        return this.dll;
    }

    private insertAsMostRecentNode(value: T) {
        let node = new ListNode(value);
        /** 
         * if dll is empty i,e head is null simply make this node as head
        */
        if (this.dll?.head === null) {
            this.dll.head = node;
            this.dll.end = node;
        } else {
            /**
             * The dll already have a head, thus update this node at head.
             */
            this.insertAtHead(node);
        }
        /** Mark entry for the value corresponding to the node in hashmap*/
        this.mp.set(value, node);
    }

    private insertAtHead(node: ListNode<T>) {
        let temp: ListNode<T> | null = null;
        if (this.dll && this.dll.head) {
            temp = this.dll.head;
            node.next = temp;
            node.prev = null;
            temp.prev = node;
            this.dll.head = node;
        }
    }

    private evict() {
        /**Remove the end of the list and mark a new end as end = end.prev */
        if (this.dll?.end && this.dll.end.prev) {
            this.dll.end.prev.next = null;
            this.dll.end = this.dll.end.prev;
        }
    }
}
```

**4) MRU (Most recently used):**

This caching eviction technique is used to remove the most recently used data
in the cache. the general use case is lets say we are watching a youtube video so at this point
its the most recently used, now while showing recommendations, in case the recommendations is coming
from cache, then it wont show what we have just watched, thus removing the most recent used data point.

Its implementation is mostly same as LRU, however only once capacity is reached, eviction is different
as here we remove the most recent data i,e the head of the doubly linked list.

```typescript
/**
 * 0(1),0(n)
 */

/**
 * Node class which creates a simple node with 3 things
 * a previous, a next and the data.
*/
class ListNode<T> {
    private data: T;
    prev: ListNode<T> | null;
    next: ListNode<T> | null;

    constructor(val: T) {
        this.data = val;
        this.prev = null;
        this.next = null;
    }
}

/**
 * Doubly linked list of nodes which has a head and a end.
 * 
*/
class Dll<T> {
    head: ListNode<T> | null;
    end: ListNode<T> | null;

    constructor() {
        this.head = null;
        this.end = null;
    }
}

class MRU<T> {
    private mp: Map<T, ListNode<T>>;
    private capacity: number;
    private dll: Dll<T> | null;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.mp = new Map();
        this.dll = new Dll();
    }

    insert(value: T) {
        /** if capacity of cache is 0 return immediately */
        if (this.capacity === 0) return;

        /**
         * if map already contains the value, it means we need to cut the 
         * connection of this node and create a new node and mark it as head
         * of dll.
         * 
         * a) The node whom we need to cut connection is already at head, don't do anything
         * as its already head.
         * 
         * b) If node which we are cutting connection of lies at end of dll i,e node.next === null
         *    then cut connection and update the end as end = node.prev and insert new node with this
         *    value at head.
         * 
         * c) If node which we are cutting connection lies inn between somewhere, end will remain same,
         *    cut its connection, mark a new node with the same value at head.
         */
        if (this.mp.has(value)) {
            let node = this.mp.get(value)!;
            if (this.dll && node !== this.dll.head) {
                if (node.next) {
                    node.next.prev = node.prev;
                }else {
                    this.dll.end = node.prev;
                }
                if (node.prev) {
                    node.prev.next = node.next;
                }
                if (this.dll.head?.next === null) {
                    this.dll.end = this.dll.head;
                }
                this.insertAsMostRecentNode(value);
            }
            
        } 
        /**
        * If its a fresh entry
        */
        else {
            /**
             * If the capacity is reached, remove the least recent used i,e from the end of the 
             * dll and update the end
             */
            if (this.mp.size >= this.capacity) {
                this.evict();
            } else {
                /** 
                 * The cache has capacity thus simply insert the value at head as its most
                 * recently used.
                 * **/
                this.insertAsMostRecentNode(value);
            }
        }
    }

    showCache() {
        return this.dll;
    }

    private insertAsMostRecentNode(value: T) {
        let node = new ListNode(value);
        /** 
         * if dll is empty i,e head is null simply make this node as head
        */
        if (this.dll?.head === null) {
            this.dll.head = node;
            this.dll.end = node;
        } else {
            /**
             * The dll already have a head, thus update this node at head.
             */
            this.insertAtHead(node);
        }
        /** Mark entry for the value corresponding to the node in hashmap*/
        this.mp.set(value, node);
    }

    private insertAtHead(node: ListNode<T>) {
        let temp: ListNode<T> | null = null;
        if (this.dll && this.dll.head) {
            temp = this.dll.head;
            node.next = temp;
            node.prev = null;
            temp.prev = node;
            this.dll.head = node;
        }
    }

    private evict() {
        /**
         * Remove the head of the list,
         * 
         * if head is only node in dll, i,e head.next is null then remove head 
         * head = null.
         * 
         * if head has a next then mark that as head.
         * 
         * 
         */
        if (this.dll?.head) {
            if (this.dll.head.next === null) {
                this.dll.head = null;
            } else {
                let temp = this.dll.head.next;
                this.dll.head.next = null;
                this.dll.head = temp;
            }
        }
    }
}
```