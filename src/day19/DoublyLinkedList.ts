type Node<T> = {
    value: T,
    next?: Node<T>,
    prev?: Node<T>
}

export default class DoublyLinkedList<T> {
    public length: number;
    public head?: Node<T>;
    public tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    prepend(item: T): void {
        ++this.length;
        const node = this.createNode(item);

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        this.head.prev = node;
        node.next = this.head;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        const newNode = this.createNode(item);
        const node = this.getNode(idx);
        if (!node) { return; }

        ++this.length;

        newNode.next = node;
        newNode.prev = node.prev;
        node.prev = newNode;
    }

    append(item: T): void {
        ++this.length;
        const node = this.createNode(item);

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        let node = this.head;
        let index = 0;

        while (node && node.value !== item) {
            ++index;
            node = node.next;
        }

        if (!node) { return; }

        return this.removeAt(index);
    }

    get(idx: number): T | undefined {
        return this.getNode(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        const node = this.getNode(idx);
        if (!node) { return; }

        --this.length;

        if (node.prev) {
            node.prev.next = node.next;
        } else { // must be the head
            this.head = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        } else { // must be the tail
            this.tail = node.prev;
        }

        node.next = undefined;
        node.prev = undefined;

        return node.value;
    }

    private getNode(idx: number): Node<T> | undefined {
        let node = this.head;

        while (idx > 0 && idx < this.length && node) {
            node = node.next;
            --idx;
        }

        return node;
    }

    private createNode(value: T): Node<T> {
        return { value };
    }
}
