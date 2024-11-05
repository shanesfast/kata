type BTBFSNode<T> = {
    val: T,
    next?: BTBFSNode<T>
}

class BTBFSQueue<T> {
    public length: number;
    public head?: BTBFSNode<T>;
    public tail?: BTBFSNode<T>;

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

    private createNode(value: T): BTBFSNode<T> {
        return { val: value };
    }
}

export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const q = new BTBFSQueue<BinaryNode<number>>();
    let node: BinaryNode<number> | undefined;

    q.enqueue(head);

    do {
        node = q.deque();

        if (node?.value === needle) {
            return true;
        }

        if (node?.left) { q.enqueue(node.left); }
        if (node?.right) { q.enqueue(node.right); }

    } while (q.length);

    return false;
}
