export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] {
    const q = new Queue<number>();
    const prev: number[] = new Array(graph.length).fill(-1);
    const seen: boolean[] = new Array(graph.length).fill(false);

    q.enqueue(source);

    while (q.length) {
        const curr = q.deque() as number;
        const neighbors = graph[curr];

        if (curr === needle) { break; }

        for (let i=0; i<neighbors.length; ++i) {
            const weight = neighbors[i];

            if (weight !== 0 && !seen[i]) {
                q.enqueue(i);
                seen[i] = true;
                prev[i] = curr;
            }
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
        const node = {value: item} as Node<T>;

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

        this.head = node.next;

        if (!this.length) {
            this.tail = undefined;
        }

        return node.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}