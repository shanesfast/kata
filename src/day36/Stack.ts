type Node<T> = {
    value: T,
    prev?: Node<T>,
    next?: Node<T>
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
        this.tail = node?.prev;

        if (!this.length) {
            this.head = undefined;
        }

        return node?.value;
    }

    peek(): T | undefined {
        return this.tail?.value;
    }
}