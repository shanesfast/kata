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
        this.head = this.tail = undefined;
    }

    enqueue(item: T): void {
        const node = this.createNode(item);
        ++this.length;
        
        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }
        
        this.tail.next = node;
        this.tail = node;
    }

    deque(): T | undefined {
        const node = this.head;
        if (!node) { return; }

        --this.length;

        this.head = node.next;
        node.next = undefined;

        if (this.tail === node) {
            this.tail = undefined;
        }

        return node?.val;
    }

    peek(): T | undefined {
        return this.head?.val;
    }

    private createNode(value: T): Node<T> {
        return { val: value };
    }
}