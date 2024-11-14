export default class MaxHeap {
    get length(): number { return this.data.length; }
    public data: number[][];

    constructor() {
        this.data = [];
    }

    top(): number[] {
        return this.data[0];
    }

    insert(value: number[]): void {
        this.data.push(value);
        this.heapUp(this.length - 1);
    }

    delete(): number[] | undefined {
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

        if (pVal[0] < val[0]) {
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

        if (rVal[0] < lVal[0] && val[0] < lVal[0]) {
            this.data[l] = val;
            this.data[idx] = lVal;
            this.heapDown(l);
        }

        if (lVal[0] < rVal[0] && val[0] < rVal[0]) {
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