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
    const q = new Queue<number>();
    const seen: boolean[] = new Array(graph.length).fill(false);
    const prev: number[] = new Array(graph.length).fill(-1);

    // queue the source and mark it as seen
    q.enqueue(source);
    seen[source] = true;

    while (q.length) {
        const curr = q.deque() as number;
        if (curr === needle) { break; }

        seen[curr] = true;

        const edges = graph[curr];
        for (let i=0; i<edges.length; ++i) {
            if (seen[i]) { continue; }
            const weight = edges[i];

            // if weight is 0, there is no connection to the node
            if (weight !== 0) {
                prev[i] = curr;
                q.enqueue(i);
            }
        }
    }

    const out: number[] = [];
    let curr = needle;

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
