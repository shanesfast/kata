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
        // nothing to delete
        if (this.length < 1) { return; }

        // always remove the top node from a heap
        const node = this.data[0];

        // if only 1 node in the heap, pop and exit
        if (this.length < 2) {
            this.data.pop();
            return node;
        }

        // if there is more than 1 node, set last node to the top
        // then pop the duplicate last node off the array
        // then heap down, this restores order to the MinHeap
        this.data[0] = this.data[this.data.length - 1];
        this.data.pop();
        this.heapDown(0);

        return node;
    }

    private heapUp(idx: number): void {
        // compare node to parent, swapping when needed
        let parentIdx = this.parent(idx);
        while (parentIdx >= 0 && this.data[parentIdx] > this.data[idx]) {
            this.swapNodes(idx, parentIdx);
            idx = parentIdx;
            parentIdx = this.parent(parentIdx);
        }
    }

    private heapDown(idx: number): void {
        let keepHeapin = true;
        while (keepHeapin) {
            let leftChild = this.leftChild(idx);
            // if left child is out of bounds, we are done
            if (leftChild >= this.data.length) { break; }

            let rightChild = this.rightChild(idx);
            let leftChildVal = this.data[leftChild];
            let rightChildVal = this.data[rightChild];
            let val = this.data[idx];

            if (!rightChildVal && val > leftChildVal) {
                this.swapNodes(idx, leftChild);
                idx = leftChild;
                continue;
            }

            // heap down left
            if (rightChildVal > leftChildVal && val > leftChildVal) {
                this.swapNodes(idx, leftChild);
                idx = leftChild;
                continue;
            }

            // heap down right
            if (leftChildVal > rightChildVal && val > rightChildVal) {
                this.swapNodes(idx, rightChild);
                idx = rightChild;
                continue;
            }

            keepHeapin = false;
        }
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private leftChild(idx: number): number {
        return Math.floor(idx * 2 + 1);
    }

    private rightChild(idx: number): number {
        return Math.floor(idx * 2 + 2);
    }

    private swapNodes(idx1: number, idx2: number) {
        let temp = this.data[idx1];
        this.data[idx1] = this.data[idx2];
        this.data[idx2] = temp;
    }
}

// const heap = new MinHeap();

// heap.insert(5);
// heap.insert(3);
// heap.insert(69);
// heap.insert(420);
// heap.insert(4);
// heap.insert(1);
// heap.insert(8);
// heap.insert(7);
// console.log(heap.delete()); // 1
// console.log(heap.delete()); // 3
// console.log(heap.delete()); // 4
// console.log(heap.delete()); // 5
// console.log(heap.delete()); // 7
// console.log(heap.delete()); // 8
// console.log(heap.delete()); // 69
// console.log(heap.delete()); // 420
