export default class MinHeap<T> {
    public get length(): number { return this.data.length; }
    public data: T[];

    constructor() {
        this.data = [];
    }

    insert(value: T): void {
        // place the new value at the end of the data array... run the heapUp function to place it properly in the heap
        this.data[this.data.length] = value;
        this.heapUp(this.data.length - 1);
    }

    delete(): T | undefined {
        // nothing to delete
        if (this.data.length < 1) { return; }

        // get the node that is being deleted
        // always remove from the top (index 0)
        const node = this.data[0];

        // if there is only 1 or 0 nodes in the data array, exit early
        if (this.data.length < 2) {
            this.data.pop();
            return node;
        }

        // if there is more than 1 node:
        // set the top node to the last node in the heap, then remove that last node (effectively moving it to the top)
        if (this.data.length > 1) {
            this.data[0] = this.data[this.data.length - 1];
            this.data.pop();
            this.heapDown(0);
        }

        return node;
    }

    private heapUp(idx: number): void {
        // at index 0, we are done
        if (idx === 0) { return; }

        // grab the parent of the current node
        const pIdx = this.parent(idx);
        const pVal = this.data[pIdx];
        const val = this.data[idx];

        // check if parent value is greater than current value
        // swap them if so (we are heaping UP, so larger values go down, smaller values go up!)
        if (pVal > val) {
            // swap the nodes!
            this.data[idx] = pVal;
            this.data[pIdx] = val;
            this.heapUp(pIdx);
        }
    }

    private heapDown(idx: number): void {
        const leftIdx = this.leftChild(idx);
        const rightIdx = this.rightChild(idx);

        // if we are outside the bounds of the array, we are done
        // make sure to check if the child nodes are out of bounds as well 
        // (check the left child node since it will have a smaller index than the right child node)
        if (idx >= this.data.length || leftIdx >= this.data.length) { return; }

        const leftVal = this.data[leftIdx];
        const rightVal = this.data[rightIdx];
        const val = this.data[idx];

        // should we go left?
        // only if the right value is greater than the leftVal and current val is greater than the left
        if (rightVal > leftVal && val > leftVal) {
            this.data[idx] = leftVal;
            this.data[leftIdx] = val;
            this.heapDown(leftIdx);
        }

        // should we go right?
        // only if the left value is > rightValue and current val is > rightVal
        if (leftVal > rightVal && val > rightVal) {
            this.data[idx] = rightVal;
            this.data[rightIdx] = val;
            this.heapDown(rightIdx);
        }
    }

    private parent(idx: number) {
        return Math.floor(((idx - 1) / 2));
    }
    
    private leftChild(idx: number) {
        return Math.floor((2 * idx) + 1);
    }

    private rightChild(idx: number) {
        return Math.floor((2 * idx) + 2);
    }
}