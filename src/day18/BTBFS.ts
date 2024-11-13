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
        const node = this.createNode(item);

        if (!this.tail) {
            this.head = this.tail = node;
        }

        this.tail.next= node;
        node.prev = this.tail;
        this.tail= node;
    }

    deque(): T | undefined {
        this.length = Math.max(0, this.length - 1);

        const node = this.head;

        if (node) {
            this.head = node.next;
            node.next = undefined;
        }

        if (!this.length) {
            this.tail = undefined;
        }

        return node?.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }

    private createNode(item: T): Node<T> {
        return { value: item };
    }
}

export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const q = new Queue<Node<BinaryNode<number>>>();
    q.enqueue(createNode(head));

    while (q.length) {
        const curr = q.deque()?.value;
        if (!curr) { break; }

        if (curr.value === needle) { return true; }

        if (curr.left) { q.enqueue(createNode(curr.left)); }
        if (curr.right) { q.enqueue(createNode(curr.right)); }
    }

    return false;
}

function createNode(value: BinaryNode<number>): Node<BinaryNode<number>> {
    return { value };
}
