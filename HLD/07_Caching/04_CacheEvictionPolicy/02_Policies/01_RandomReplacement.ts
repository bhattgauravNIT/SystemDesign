/**
 * 
 * Random replacement as word suggest refers to policy in which once ram size is reached or set threshold is reached 
 * we remove random data from the cache.
 * 
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
        if (this.arr.length >= this.capacity) {
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

