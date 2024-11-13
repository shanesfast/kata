type Node<T> = {
    value: T,
    next?: Node<T>,
    prev?: Node<T>
}

export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;
    private lookup: Map<K, Node<V>>;
    private revLookup: Map<Node<V>, K>;
    private cap: number;

    constructor(cap: number = 10) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.revLookup = new Map<Node<V>, K>();
        this.cap = cap;
    }

    update(key: K, value: V): void {
        let node = this.lookup.get(key);

        if (!node) {
            ++this.length;
            node = this.createNode(value);

            this.prepend(node);
            this.lookup.set(key, node);
            this.revLookup.set(node, key);

            this.trimCache();
        } else {
            node.value = value;
        }
    }

    get(key: K): V | undefined {
        const node = this.lookup.get(key);
        if (!node) { return; }

        this.delete(node);
        this.prepend(node);

        return node.value;
    }

    private trimCache(): void {
        if (this.length <= this.cap) { return; }

        const node = this.tail;
        if (!node) { return; }

        --this.length;
        this.delete(node);

        const key = this.revLookup.get(node);
        if (key) { this.lookup.delete(key); }
        this.revLookup.delete(node);
    }

    private prepend(node: Node<V>): void {
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        this.head.prev = node;
        node.next = this.head;
        this.head = node;
    }

    private delete(node: Node<V>): void {
        if (node.next) {
            node.next.prev = node.prev;
        } else { // must be the tail
            this.tail = node.prev;
        }

        if (node.prev) {
            node.prev.next = node.next;
        } else { // must be the head
            this.head = node.next;
        }

        node.next = undefined;
        node.prev = undefined;
    }

    private createNode(value: V): Node<V> {
        return { value };
    }
}