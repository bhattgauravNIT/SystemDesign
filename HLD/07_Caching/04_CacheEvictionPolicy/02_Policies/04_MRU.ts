/**
 * Most recently used
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
        if (this.capacity === 0) return;
        if (this.mp.has(value)) {
            let node = this.mp.get(value)!;
            if (this.dll && node !== this.dll.head) {
                if (node.next) {
                    node.next.prev = node.prev;
                } else {
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

        } else {
            if (this.mp.size >= this.capacity) {
                this.evict();
            } else {
                this.insertAsMostRecentNode(value);
            }
        }
    }

    showCache() {
        return this.dll;
    }

    private insertAsMostRecentNode(value: T) {
        let node = new ListNode(value);
        if (this.dll?.head === null) {
            this.dll.head = node;
            this.dll.end = node;
        } else {
            this.insertAtHead(node);
        }
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