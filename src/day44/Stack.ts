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
        const node = this.tail;
        if (!node) { return; }

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

        return node?.value;
    }

    peek(): T | undefined {
        return this.tail?.value;
    }
}