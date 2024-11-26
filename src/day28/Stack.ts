type Node<T> = {
    value: T,
    next?: Node<T>,
    prev?: Node<T>
}

export default class Stack<T> {
    public length: number;
    public head?: Node<T>;
    public tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    push(item: T): void {
        ++this.length;
        const node = { value: item } as Node<T>;

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }

    pop(): T | undefined {
        this.length = Math.max(0, this.length - 1);
        const node = this.tail;

        if (!node) { return; }

        this.tail = node.prev;
        if (this.tail) { this.tail.next = undefined; }
        if (!this.length) { this.head = undefined; }

        return node.value;
    }

    peek(): T | undefined {
        return this.tail?.value;
    }
}