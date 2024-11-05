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
        if (!this.length) { return; }

        if (this.length < 2) {
            return this.data.pop();
        }

        const node = this.data[0];
        // set last node to top of heap, remove the original from the end of the array,
        // then run heapDown to restore MinHeap order
        this.data[0] = this.data[this.length - 1];
        this.data.pop();
        this.heapDown(0);

        return node;
    }

    private heapUp(idx: number): void {
        let pIdx = this.parent(idx);
        let pVal = this.data[pIdx];
        let val = this.data[idx];

        if (idx === 0 || pVal <= val) { return; }

        this.data[pIdx] = val;
        this.data[idx] = pVal;
        this.heapUp(pIdx);
    }

    private heapDown(idx: number): void {
        let leftIdx = this.leftChild(idx);
        let rightIdx = this.rightChild(idx);
        
        if (leftIdx >= this.length || idx >= this.length) { return; }

        const leftVal = this.data[leftIdx];
        const rightVal = this.data[rightIdx];
        const val = this.data[idx];

        // go left
        if (rightVal > leftVal && val > leftVal) {
            this.data[leftIdx] = val;
            this.data[idx] = leftVal;
            this.heapDown(leftIdx);
        }

        // go right
        if (leftVal > rightVal && val > rightVal) {
            this.data[rightIdx] = val;
            this.data[idx] = rightVal;
            this.heapDown(rightIdx);
        }
    }

    private parent(idx: number) {
        return Math.floor((idx - 1) / 2);
    }

    private leftChild(idx: number) {
        return Math.floor((idx * 2) + 1);
    }

    private rightChild(idx: number) {
        return Math.floor((idx * 2) + 2);
    }
}