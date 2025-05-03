/**
 * Least frequently used cache eviction policy is used to remove the least frequent used data from the cache.
 */

/**
 * 
 * 0(n),0(n)
 * 
 * This approach is 0(n),0(n) as we are finding the min freq element from the map which is 0(n)
 * in case the capacity is exceeding the permissible value and then finding the index of that key
 * in the cache array which is again 0(n). Then swapping it with the last element of the array and 
 * then popping so over all this approach for cache eviction for least frequently used is 0(n),0(n)
 * but what makes cache fast is its 0(1) time complexity and thus we need a better approach.
 * 
 * Moreover this approach also does not take into account the problem when two keys have same frequencies,
 * then which one to evict.
 * 
 */
class LFU<T> {
    mp: Map<T, number>;
    arr: T[];
    cacheCapacity: number;

    constructor() {
        this.mp = new Map();
        this.arr = [];
        this.cacheCapacity = 10;
    }

    insert(val: T) {
        if (this.mp.has(val)) {
            const value: number | undefined = this.mp.get(val);
            if (value) {
                this.mp.set(val, value + 1);
            }
        } else {
            if (this.arr.length >= this.cacheCapacity) {
                let min = Number.MAX_SAFE_INTEGER;
                let k: T | undefined;
                for (const [key, value] of this.mp) {
                    if (value < min) {
                        min = value;
                        k = key;
                    }
                }
                if (k) {
                    let ind = this.arr.indexOf(k);
                    let temp = this.arr[ind];
                    this.arr[ind] = this.arr[this.arr.length - 1];
                    this.arr[this.arr.length - 1] = temp;
                    this.arr.pop();
                    this.mp.delete(k);
                }
            }
            this.arr.push(val);
            this.mp.set(val, 1);
        }
    }
}

/**
 * 
 * 0(1),0(1)
 * 
 * The idea is to maintain two maps, one with value -> frequencies.
 * Another with frequency -> Set of values having that frequency.
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