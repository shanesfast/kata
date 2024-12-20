export default class MinHeap {
    get length(): number { return this.data.length; }
    public data: number[];

    constructor() {
        this.data = [];
    }

    insert(value: number): void {
        this.data.push(value);
        this.heapUp(this.length - 1);
    }

    delete(): number {
        const n = this.data[0];

        // Swap the last value to the top of the heap, effectively deleting the min value from the heap
        // restore order with heapDown
        this.data[0] = this.data[this.length - 1];
        this.data.pop(); // remove the duplicate value
        this.heapDown(0);

        return n;
    }

    private heapUp(idx: number): void {
        if (idx === 0) { return; }

        const pIdx = this.parent(idx);
        const pVal = this.data[pIdx];
        const val = this.data[idx];

        if (val < pVal) {
            this.data[idx] = pVal;
            this.data[pIdx] = val;
            this.heapUp(pIdx);
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
            this.data[idx] = lVal;
            this.data[l] = val;
            this.heapDown(l);
        }

        if (lVal > rVal && val > rVal) {
            this.data[idx] = rVal;
            this.data[r] = val;
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
