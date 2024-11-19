export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const prev: number[] = new Array(graph.length).fill(-1);
    const q: Queue<number> = new Queue<number>();

    // queue the source, mark it as seen
    q.enqueue(source);
    seen[source] = true;

    // while items in q, process them
    while (q.length) {
        const curr = q.deque() as number;
        if (curr === needle) { break; }

        seen[curr] = true;

        const edges = graph[curr];
        for (let i=0; i<edges.length; ++i) {
            const weight = edges[i];
            // 0 means no connection to curr
            if (weight !== 0 && !seen[i]) {
                q.enqueue(i);
                prev[i] = curr;
            }
        }
    }

    // build path from source to needle
    // start from needle and work backward using the "previous" array
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
