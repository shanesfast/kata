export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const q = new Queue();
    q.enqueue(head);

    while (q.length) {
        const curr = q.deque() as BinaryNode<number>;

        if (curr.value === needle) { return true; }
        if (curr.left) { q.enqueue(curr.left); }
        if (curr.right) { q.enqueue(curr.right); }
    }

    return false;
}

type Node<T> = {
    value: T,
    next?: Node<T>,
    prev?: Node<T>
}

class Queue<T> {
    public length: number;
    public head?: Node<T>;
    public tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    enqueue(item: T): void {
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

    deque(): T | undefined {
        this.length = Math.max(0, this.length - 1);
        if (!this.head) { return; }

        const node = this.head;
        this.head = node.next

        if (this.head) {
            this.head.prev = undefined;
        }

        if (!this.length) {
            this.tail = undefined;
        }

        node.next = undefined;
        return node.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
