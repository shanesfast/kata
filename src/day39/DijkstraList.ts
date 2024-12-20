export default function dijkstra_list(source: number, sink: number, arr: WeightedAdjacencyList): number[] {
    const prev: number[] = new Array(arr.length).fill(-1);
    const distances: number[] = new Array(arr.length).fill(Infinity);
    const heap = new MinHeap();

    heap.insert(source);
    distances[source] = 0;

    while (heap.length) {
        const curr = heap.delete() as number;
        const edges = arr[curr];

        for (let i=0; i<edges.length; ++i) {
            const edge = edges[i];
            const newDist = distances[curr] + edge.weight;

            if (edge.weight > 0 && newDist < distances[edge.to]) {
                distances[edge.to] = newDist;
                prev[edge.to] = curr;
                heap.insert(edge.to);
            }
        }
    }

    const out: number[] = [];
    let curr: number = sink;

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
    get length(): number { return this.data.length; }
    public data: number[];

    constructor() {
        this.data = [];
    }

    insert(value: number): void {
        this.data.push(value);
        this.heapUp(this.data.length - 1);
    }

    delete(): number {
        const top = this.data[0];

        this.data[0] = this.data[this.length - 1];
        this.data.pop();
        this.heapDown(0);

        return top;
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

    private heapUp(idx: number): void {
        if (idx < 1) { return; }

        const p = this.parent(idx);
        const pVal = this.data[p];
        const val = this.data[idx];

        if (pVal > val) {
            this.data[p] = val;
            this.data[idx] = pVal;
            this.heapUp(p);
        }
    }

    private heapDown(idx: number): void {
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
}
