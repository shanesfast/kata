type Node<T> = {
    value: T,
    next?: Node<T>,
    prev?: Node<T>
}

export default class LRU<K, V> {
    public length: number;
    public head?: Node<V>;
    public tail?: Node<V>;
    public lookup: Map<K, Node<V>>;
    public reverseLookup: Map<Node<V>, K>;
    public cap: number;

    constructor(cap: number = 10) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
        this.cap = cap;
    }

    update(key: K, value: V): void {
        let node = this.lookup.get(key);
        if (!node) {
            node = this.createNode(value);
            ++this.length;
            this.trimCache();
            this.lookup.set(key, node);
            this.reverseLookup.set(node, key);
        }

        node.value = value;
        this.detach(node);
        this.prepend(node);
    }

    get(key: K): V | undefined {
        const node = this.lookup.get(key);
        if (!node) { return; }

        // move node to the front of the list
        this.detach(node);
        this.prepend(node);

        return node.value;
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

    private prepend(node: Node<V>): void {
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    private createNode(item: V): Node<V> {
        return { value: item };
    }
}