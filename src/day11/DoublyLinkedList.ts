type Node<T> = {
    val: T,
    next?: Node<T>,
    prev?: Node<T>
}

export default class DoublyLinkedList<T> {
    public length: number;
    public head?: Node<T>;
    public tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    prepend(item: T): void {
        ++this.length;
        const node = this.createNode(item);

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        const node = this.getNodeAtIndex(idx);
        if (!node) { return; }

        ++this.length;

        const newNode = this.createNode(item);

        if (!node.prev) { this.head = newNode; }
        if (!node.next) { this.tail = newNode; }

        newNode.next = node;
        newNode.prev = node.prev;
        node.prev = newNode;
    }

    append(item: T): void {
        ++this.length;
        const node = this.createNode(item);

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        let node = this.head;
        if (!this.head) { return; }

        while (node) {
            if (node.val === item) { break; }
            node = node.next;
        }

        if (!node) { return; }
        return this.removeNode(node);
    }

    get(idx: number): T | undefined {
        return this.getNodeAtIndex(idx)?.val;
    }

    removeAt(idx: number): T | undefined {
        let node = this.getNodeAtIndex(idx);
        if (!node) { return; }

        return this.removeNode(node);
    }

    rotateLeftAsIfSingly(rotations: number) {
        if (rotations < 1 || rotations === this.length) { return; }

        let adjuster = rotations; // used to adjust the target position on each loop cycle

        for (let i=0; i<this.length-1; ++i) {
            let target = this.head;
            let right = this.length - adjuster;
            
            // keep right movement within boundaries of the array
            adjuster += rotations; // offset for next swap
            while (right >= this.length) { right = right - this.length; }
            while (right < 0) { right = right + this.length; }

            // no need to swap if the node ends up in the same spot
            if (right === 0) { continue; }

            while (right) {
                --right;
                target = target?.next;
            }

            let headNext = this.head?.next; 
            let swapNext = target?.next;
            let swapPrev = target?.prev;

            // handle case for node right next to head node
            if (headNext === target) {
                headNext = this.head;
                swapPrev = target;
            }

            // perform the swap and fix pointers
            let temp = this.head;
            this.head = target;
            target = temp;

            if (this.head) { 
                this.head.next = headNext; 
                this.head.prev = undefined;
            }

            if (target) {
                target.next = swapNext;
                target.prev = swapPrev;
            }

            if (headNext) { headNext.prev = this.head; }
            if (swapNext) { swapNext.prev = target; } // if no swapNext node, then target must be the tail now
            else { this.tail = target; }
            if (swapPrev) { swapPrev.next = target; }
        }
    }

    printAsArray() {
        let node = this.head;
        let arr = [];
        while (node) { arr.push(node?.val); node = node.next; }
        console.log(arr);
    }

    private createNode(value: T): Node<T> {
        return { val: value };
    }

    private getNodeAtIndex(idx: number): Node<T> | undefined {
        let node = this.head;

        if (!this.head) { return; }

        while (node && idx) {
            --idx;
            node = node.next;
        }

        return node;
    }

    private removeNode(node: Node<T>): T | undefined {
        --this.length;

        if (this.length < 1) {
            this.head = this.tail = undefined;
            node.prev = node.next = undefined;
            return node.val;
        }

        if (node.prev) {
            node.prev.next = node.next;
        } else { // must be the head
            this.head = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        } else { // must be the tail
            this.tail = node.prev;
        }

        node.prev = node.next = undefined;
        return node.val;
    }
}

const list = new DoublyLinkedList<number>();

list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.append(5);
list.append(6);
list.append(7);

list.printAsArray();
list.rotateLeftAsIfSingly(23);
list.printAsArray();

// [1, 2, 3, 4, 5, 6, 7]
// [4, 5, 6, 7, 1, 2, 3]

