type Node<T> = {
    val: T,
    next?: Node<T>
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
        const node = { val: item } as Node<T>;

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }

    pop(): T | undefined {
        this.length = Math.max(0, this.length - 1);
        const node = this.tail;

        if (node) {
            this.tail = node.prev;
        }

        return node?.val;
    }

    peek(): T | undefined {
        return this.tail?.val;
    }
}