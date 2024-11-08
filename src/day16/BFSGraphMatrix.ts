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

export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
    const prev: number[] = new Array(graph.length).fill(-1);
    const seen: boolean[] = new Array(graph.length).fill(false);
    const q: Queue<number> = new Queue<number>();

    // enqueue the source
    q.enqueue(source);

    while (q.length) {
        const curr = q.deque() as number;
        if (curr === needle) { break; }

        // mark as seen
        seen[curr] = true;

        // explore neighbors
        const neighbors = graph[curr];

        for (let i=0; i<neighbors.length; ++i) {
            if (seen[i] || neighbors[i] === 0) { continue; }

            // set previous node
            prev[i] = curr;

            // enqueue the neighbor
            q.enqueue(i);
        }
    }

    const out: number[] = [];
    let curr: number = needle;

    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    if (out.length) {
        out.push(source);
        return out.reverse();
    }

    return null;
}