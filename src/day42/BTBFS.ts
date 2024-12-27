export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const q = new Queue<BinaryNode<number>>();
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
    prev?: Node<T>,
    next?: Node<T>
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
        const node = this.head;

        if (!node) { return; }

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

        node.prev = node.next = undefined;
        return node.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}