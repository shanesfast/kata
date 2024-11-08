class MinHeap {
    get length(): number { return this.data.length; }
    public data: number[];

    constructor() {
        this.data = [];
    }

    insert(value: number): void {
        this.data.push(value);
        this.heapUp(this.length - 1);
    }

    delete(): number | undefined {
        const node = this.data[0];

        // move last element to the top of the heap
        // then restore order by heaping down
        this.data[0] = this.data[this.length - 1];
        this.data.pop();
        this.heapDown(0);

        return node;
    }

    private heapUp(idx: number): void {
        if (idx < 0) { return; }

        const pIdx = this.parent(idx);
        const pVal = this.data[pIdx];
        const val = this.data[idx];

        if (pVal > val) {
            this.data[pIdx] = val;
            this.data[idx] = pVal;
            this.heapUp(pIdx);
        }
    }

    private heapDown(idx: number) : void {
        if (idx >= this.length) { return; }

        const l = this.leftChild(idx);
        const r = this.rightChild(idx);
        const lVal = this.data[l];
        const rVal = this.data[r];
        const val = this.data[idx];

        if (rVal > lVal && val > lVal) {
            this.data[l] = val;
            this.data[idx] = lVal;
            this.heapDown(l);
        }

        if (lVal > rVal && val > rVal) {
            this.data[r] = val;
            this.data[idx] = rVal;
            this.heapDown(r);
        }
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private leftChild(idx: number): number {
        return Math.floor((idx*2) + 1);
    }

    private rightChild(idx: number): number {
        return Math.floor((idx*2) + 2);
    }
}

export default function dijkstra_list(source: number, sink: number, arr: WeightedAdjacencyList): number[] {
    // use bfs to visit neighbor nodes and update the distance between each node as you go
    // you want to check the lowest weighted value neighbor first on each iteration - MinHeap as a priority queue will do this efficiently
    const distances: number[] = new Array(arr.length).fill(Infinity);
    const prev: number[] = new Array(arr.length).fill(-1);
    const heap: MinHeap = new MinHeap();

    // set distance for source to 0
    distances[source] = 0;
    // add source to the heap to get started
    heap.insert(source);

    while (heap.length) {
        const curr = heap.delete() as number;
        const edges = arr[curr];

        // process edges
        for (let i=0; i<edges.length; ++i) {
            // calculate new distance and update if needed
            const edge = edges[i];
            const newDistance = distances[curr] + edge.weight;

            if (newDistance < distances[edge.to]) {
                prev[edge.to] = curr;
                distances[edge.to] = newDistance;
                heap.insert(edge.to);
            }
        }
    }

    // start with sink and build the path to sink backwards from it
    const out: number[] = [];
    let curr: number = sink;

    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    out.push(source);
    return out.reverse();
}
