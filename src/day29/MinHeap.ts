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

        this.data[0] = this.data[this.length - 1];
        this.data.pop();

        this.heapDown(0);

        return node;
    }

    private heapUp(idx: number): void {
        if (idx <= 0) { return; }

        const p = this.parent(idx);
        const pv = this.data[p];
        const v = this.data[idx];

        if (v < pv) {
            this.data[idx] = pv;
            this.data[p] = v;
            this.heapUp(p);
        }
    }

    private heapDown(idx: number): void {
        if (idx >= this.length) { return; }

        const l = this.leftChild(idx);
        const lv = this.data[l];
        const r = this.rightChild(idx);
        const rv = this.data[r];
        const v = this.data[idx];

        if (rv > lv && v > lv) {
            this.data[l] = v;
            this.data[idx] = lv;
            this.heapDown(l);
        }

        if (lv > rv && v > rv) {
            this.data[r] = v;
            this.data[idx] = rv;
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