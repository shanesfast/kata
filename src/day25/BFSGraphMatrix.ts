export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] {
    const q: Queue<number> = new Queue<number>();
    const prev: number[] = new Array(graph.length).fill(-1);
    const seen: boolean[] = new Array(graph.length).fill(false);

    q.enqueue(source);

    while (q.length) {
        const curr = q.deque() as number;
        if (curr === needle) { break; }

        seen[curr] = true;

        const weights = graph[curr];
        for (let i=0; i<weights.length; ++i) {
            const weight = weights[i];

            // 0 weight means no connection to current node
            if (weight !== 0 && !seen[i]) {
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
    }

    return out.reverse();
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

        const node = this.head;
        this.head = node?.next;
        if (this.head) { this.head.prev = undefined; }

        if (!this.length) {
            this.tail = undefined;
        }

        return node?.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
