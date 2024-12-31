export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] {
    const q = new Queue<number>();
    const prev: number[] = new Array(graph.length).fill(-1);
    const seen: boolean[] = new Array(graph.length).fill(false);

    q.enqueue(source);

    while (q.length) {
        const curr = q.deque() as number;
        if (curr === needle) { break; }

        seen[curr] = true;

        const weights = graph[curr];

        for (let i=0; i<weights.length; ++i) {
            const w = weights[i];

            if (w > 0 && !seen[i]) {
                prev[i] = curr;
                q.enqueue(i);
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
        const node = { value: item } as Node<T>;
        
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        this.head.prev = node;
        node.next = this.head;
        this.head = node;
    }

    deque(): T | undefined {
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
        return this.head?.value;
    }
}