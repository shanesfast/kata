type Node<T> = {
    value: T,
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
        const newNode = this.createNode(item);

        newNode.next = this.head;
        if (this.head) { this.head.prev = newNode; }

        this.head = newNode;
    }

    insertAt(item: T, idx: number): void {
        const target = this.getNode(idx);
        
        if (!target) {
            this.append(item);
            return;
        }

        ++this.length;
        const node = this.createNode(item) as Node<T>;

        if (target.prev === undefined) {
            node.next = this.head;
            target.prev = node;
            this.head = node;
        }

        if (target.next === undefined) {
            node.next = this.tail;
            if (this.tail?.prev) { this.tail.prev.next = node; }
        }

        const prev = target.prev;

        if (prev) {
            prev.next = node;
        }

        target.prev = node;
    }

    append(item: T): void {
        ++this.length;
        const newNode = this.createNode(item);

        newNode.prev = this.tail;
        if (this.tail) { this.tail.next = newNode; }

        if (!this.head) {
            this.head = newNode;
        }

        this.tail = newNode;
    }

    remove(item: T): T | undefined {
        let node = this.head;
        let index = 0;

        while (node && node.value !== item) {
            ++index;
            node = node.next;
        }

        if (!node) { return; }

        return this.removeAt(index);
    }

    get(idx: number): T | undefined {
        return this.getNode(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        let node = this.getNode(idx);
        if (!node) { return undefined; }

        // adjust length
        --this.length;

        // is it a head
        if (node.prev === undefined) {
            this.head = node.next;
            node.prev = undefined;

            return node.value;
        }

        // is it a tail
        if (node.next === undefined) {
            this.tail = node.prev;
            node.next = undefined;

            return node.value;
        }

        // is it in the middle
        let nextNode = node.next;
        let prevNode = node.prev;

        nextNode.prev = prevNode;
        prevNode.next = nextNode;

        node.next = undefined;
        node.prev = undefined;

        return node.value;
    }

    private getNode(idx: number): Node<T> | undefined {
        let node = this.head;
        if (node === undefined) { return undefined; }

        for (let i=0; i<idx; ++i) {
            node = node?.next;
        }

        return node;
    }

    private createNode(value: T): Node<T> {
        return { value };
    }

    print() {
        let out = "";
        let node = this.head;

        while (node) {
            out += ` ${node.value}, `;
            node = node.next;
        }

        console.log(out);
    }
}

// const dl = new DoublyLinkedList();
// dl.prepend(1);
// dl.prepend(2);
// dl.prepend(3);
// dl.prepend(4);
// dl.prepend(5);

// console.log(dl.get(3));