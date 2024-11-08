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
        this.length = 0
        this.cap = cap;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.revLookup = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        let node = this.lookup.get(key);

        if (node) {
            node.value = value;
            this.detach(node);
            this.prepend(node);
            return;
        }    

        ++this.length;

        node = { value: value } as Node<V>;
        this.prepend(node);
        this.trimCache();

        this.lookup.set(key, node);
        this.revLookup.set(node, key);
    }

    get(key: K): V | undefined {
        const node = this.lookup.get(key);

        if (node) { 
            this.detach(node);
            this.prepend(node);
        }

        return node?.value;
    }

    private trimCache() {
        if (this.length <= this.cap) {
            return;
        }

        --this.length;
        const node = this.tail as Node<V>; 
        console.log(`evicting: ${node.value}`);

        this.tail = node?.prev;
        if (this.tail) { this.tail.next = undefined; }
        node.prev = undefined;

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

    private detach(node: Node<V>): void {
        let prev = node.prev;
        let next = node.next;

        if (prev) {
            prev.next = next;
        } else { // must be the head
            this.head = next;
        }

        if (next) {
            next.prev = prev;
        } else { // must be the tail
            this.tail = prev;
        }

        node.next = undefined;
        node.prev = undefined;
    }
}