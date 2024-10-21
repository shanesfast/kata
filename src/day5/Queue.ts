type Node<T> = {
    val: T,
    next?: Node<T>
}

export default class Queue<T> {
    public length: number;
    public head?: Node<T>;
    public tail?: Node<T>;

    constructor() {
        this.length = 0;
    }

    enqueue(item: T): void {
        ++this.length;
        const node = { val: item } as Node<T>;

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        } 

        this.tail.next = node;
        this.tail = node;
    }

    deque(): T | undefined {
        this.length = Math.max(0, this.length - 1);

        if (this.length < 1) {
            this.tail = undefined;
        }

        const node = this.head;

        if (node) {
            this.head = node.next;
            node.next = undefined;
        }

        return node?.val;
    }

    peek(): T | undefined {
        return this.head?.val;
    }
}