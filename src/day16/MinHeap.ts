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

    delete(): number | undefined {
        const node = this.data[0];
        if (!node) { return; }

        // set top node to last node, pop off last node since it was moved to top, 
        // then run heapDown to establish order
        this.data[0] = this.data[this.length - 1];
        this.data.pop();
        this.heapDown(0);

        return node;
    }

    private heapUp(idx: number): void {
        if (idx === 0) { return; }

        const pIdx = this.parent(idx);
        const pVal = this.data[pIdx];
        const val = this.data[idx];

        if (pVal > val) {
            this.data[idx] = pVal;
            this.data[pIdx] = val;
        }

        this.heapUp(pIdx);
    }

    private heapDown(idx: number): void {
        if (idx >= this.length) { return; }

        const leftIdx = this.leftChild(idx);
        const rightIdx = this.rightChild(idx);
        const leftVal = this.data[leftIdx];
        const rightVal = this.data[rightIdx];
        const val = this.data[idx];

        if (rightVal > leftVal && val > leftVal) {
            this.data[idx] = leftVal;
            this.data[leftIdx] = val;
            this.heapDown(leftIdx);
        }

        if (leftVal > rightVal && val > rightVal) {
            this.data[idx] = rightVal;
            this.data[rightIdx] = val;
            this.heapDown(rightIdx);
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
