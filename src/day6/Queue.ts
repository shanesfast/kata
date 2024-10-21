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
        this.head = undefined;
        this.tail = undefined;
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
        const node = this.head;

        if (this.length < 1) {
            this.tail = undefined
        }
        
        if (node) {
            this.head = node.next;
        }

        return node?.val;
    }

    peek(): T | undefined {
        return this.head?.val;
    }
}