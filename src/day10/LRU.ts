type Node<T> = {
    val: T,
    next?: Node<T>, 
    prev?: Node<T>
}

function createNode<V>(value: V): Node<V> {
    return { val: value };
}

export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;
    private lookup: Map<K, Node<V>>;
    private reverseLookup: Map<Node<V>, K>;

    constructor(private cap: number = 10) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        let node = this.lookup.get(key);

        if (!node) {
            // insert node
            node = createNode(value);
            ++this.length;
            this.prepend(node);

            // check capacity and evict if over cap
            this.trimCache();

            // track new node values
            this.lookup.set(key, node);
            this.reverseLookup.set(node, key);
        } else {
            // move node to the front (recently used)
            this.detach(node);
            this.prepend(node);
            // update it's value
            node.val = value;
        }
    }

    get(key: K): V | undefined {
        const node = this.lookup.get(key);

        // return if no node found
        if (!node) { return undefined; }

        // update value and move to the front
        this.detach(node);
        this.prepend(node);

        return node.val;
    }

    private trimCache(): void {
        if (this.length <= this.cap) {
            return;
        }

        const tail: Node<V> | undefined = this.tail;

        // if there is a tail:
        // detach and remove from Maps
        // adjust length
        if (tail) {
            this.detach(this.tail as Node<V>);
            const key = this.reverseLookup.get(tail) as K;
            this.lookup.delete(key);
            this.reverseLookup.delete(tail);
            --this.length;
        }
    }

    // should not manage the length prop
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

    // should not manage the length prop
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
