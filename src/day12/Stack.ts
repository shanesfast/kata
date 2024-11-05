type Node<T> = {
    val: T,
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
        const node = this.createNode(item);

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }

    pop(): T | undefined {
        const node = this.tail;
        if (!node) { return; }

        --this.length;

        if (node === this.head) {
            this.head = this.tail = undefined;
            return node?.val;
        }

        this.tail = node.prev;
        node.prev = node.next = undefined;

        return node?.val;
    }

    peek(): T | undefined {
        return this.tail?.val;
    }

    private createNode(value: T): Node<T> {
        return { val: value };
    }
}