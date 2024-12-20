export default class LRU<K, V> {
    public length: number;
    public head?: Node<V>;
    public tail?: Node<V>;
    public lookup: Map<K, Node<V>>;
    public revLookup: Map<Node<V>, K>;
    public cap: number;

    constructor(cap: number = 10) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.revLookup = new Map<Node<V>, K>();
        this.cap = cap;
    }

    update(key: K, value: V): void {
        let node = this.lookup.get(key);

        if (node) {
            node.value = value;
            
            this.delete(node);
            this.prepend(node);

            return;
        }

        node = this.createNode(value);

        this.lookup.set(key, node);
        this.revLookup.set(node, key);

        this.prepend(node);
        this.trimCache();
    }

    get(key: K): V | undefined {
        const node = this.lookup.get(key);

        if (node) {
            this.delete(node);
            this.prepend(node);
        }

        return node?.value;
    }

    private trimCache(): void {
        if (this.length <= this.cap) { return; }

        if (this.tail) { 
            const key = this.revLookup.get(this.tail);
            if (key) { this.lookup.delete(key); }
            this.revLookup.delete(this.tail);

            this.delete(this.tail); 
        }
    }

    private prepend(node: Node<V>): void {
        ++this.length;

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        this.head.prev = node;
        node.next = this.head;
        this.head = node;
    }

    private delete(node: Node<V>): void {
        this.length = Math.max(0, this.length - 1);

        if (node.prev) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }

        node.prev = undefined;
        node.next = undefined;
    }

    private createNode(value: V): Node<V> {
        return { value };
    }
}

type Node<T> = {
    value: T,
    prev?: Node<T>,
    next?: Node<T>
}