type Node<T> = {
    val: T,
    next?: Node<T>,
    prev?: Node<T>
}

// jussa lil helper func
function createNode<V>(value: V): Node<V> {
    return { val: value };
}

export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;
    private lookup: Map<K, Node<V>>;
    // needed to be able to remove the key from the map
    private reverseLookup: Map<Node<V>, K>;

    constructor(private cap: number = 10) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
    }


    update(key: K, value: V): void {
        // does it exist
        let node = this.lookup.get(key);

        // if it doesn't exist
        // - insert it
        // - check capacity and evict if over
        if (!node) { 
            node = createNode(value);
            ++this.length;
            this.prepend(node);
            this.trimCache();

            this.lookup.set(key, node);
            this.reverseLookup.set(node, key);
        } 
        // if it does exist
        // - move it to the front of the list (recently used)
        // - update value
        else {
            this.detach(node);
            this.prepend(node);
            node.val = value;
        }
    }

    // this will manage the "length" property of this class
    private trimCache(): void {
        if (this.length <= this.cap) {
            return;
        }

        const tail: Node<V> | undefined = this.tail;

        if (tail) {
            this.detach(this.tail as Node<V>);
            const key = this.reverseLookup.get(tail) as K;
            this.lookup.delete(key);
            this.reverseLookup.delete(tail);
            --this.length;
        }
    }

    get(key: K): V | undefined {
        // check cache for existence
        const node = this.lookup.get(key);
        if (!node) { return undefined; }

        // update the value found and move to the front
        this.detach(node);
        this.prepend(node);

        // return value found or undefined
        return node.val;
    }

    // this function will not manage the length property of this class
     private detach(node: Node<V>): void {
        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (this.head === node) {
            this.head = this.head.next;
        }

        if (this.tail === node) {
            this.tail = this.tail.prev;
        }

        node.next = undefined;
        node.prev = undefined;
     }

     // will not manage "length" for this class
     private prepend(node: Node<V>): void {
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
     }
}