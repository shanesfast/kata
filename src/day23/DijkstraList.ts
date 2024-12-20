export default function dijkstra_list(source: number, sink: number, arr: WeightedAdjacencyList): number[] {
    const mh = new MinHeap();
    const distances: number[] = new Array(arr.length).fill(Infinity);
    const prev: number[] = new Array(arr.length).fill(-1);

    // queue source and mark distance as 0
    mh.insert(source);
    distances[source] = 0;

    while (mh.length) {
        const curr = mh.delete() as number;
        const edges = arr[curr];

        for (let i=0; i<edges.length; ++i) {
            const edge = edges[i];

            // 0 means no connection to current node
            if (edge.weight === 0) { continue; }

            const newDist = distances[curr] + edge.weight;
            
            if (newDist < distances[edge.to]) {
                prev[edge.to] = curr;
                distances[edge.to] = newDist;
                mh.insert(edge.to);
            }
        }
    }

    const out: number[] = [];
    let curr = sink;

    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    if (out.length) {
        out.push(source);
    }

    return out.reverse();
}

class MinHeap {
    get length(): number { return this.data.length; };
    public data: number[];

    constructor() {
        this.data = [];
    }

    insert(value: number): void {
        this.data.push(value);
        this.heapUp(this.length - 1);
    }

    delete(): number {
        const node = this.data[0];

        // if there is more than 1 node in the heap,
        // move last node to the top of the heap (effectively deleting the top node)
        // run heapDown to restore order
        // this method has a faster runtime than calling arr.shift();
        if (this.length > 1) {
            this.data[0] = this.data[this.length - 1];
            this.heapDown(0);
        }

        // remove last value from heap
        this.data.pop();
        return node;
    }

    private heapUp(idx: number): void {
        if (idx < 0) { return; }

        const pIdx = this.parent(idx);
        const pVal = this.data[pIdx];
        const val = this.data[idx];

        if (pVal > val) {
            this.data[idx] = pVal;
            this.data[pIdx] = val;

            this.heapUp(pIdx);
        }
    }

    private heapDown(idx: number): void {
        if (idx > this.length) { return; }

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
        return Math.floor((idx * 2) + 1);
    }

    private rightChild(idx: number): number {
        return Math.floor((idx * 2) + 2);
    }
}
