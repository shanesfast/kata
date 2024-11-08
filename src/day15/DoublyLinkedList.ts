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
        const node = this.createNode(item);

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        this.head.prev = node;
        node.next = this.head;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        let node = this.getNode(idx);
        if (!node) { return; }

        ++this.length;
        let prev = node.prev;
        let newNode = this.createNode(item);

        newNode.next = node;
        node.prev = newNode;

        if (prev) {
            newNode.prev = prev;
        } else { // must be the head
            this.head = newNode;
        }
    }

    append(item: T): void {
        ++this.length;
        const node = this.createNode(item);

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        let node = this.head;
        let index = -1;

        for (let i=0; i<this.length && node; ++i) {
            if (node.value === item) { 
                index = i;
                break; 
            }

            node = node.next;
        }

        return this.removeAt(index);
    }

    get(idx: number): T | undefined {
        return this.getNode(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        let node = this.getNode(idx);

        if (node) {
            --this.length;

            const prev = node.prev;
            const next = node.next;

            if (prev) {
                prev.next = next;
            }

            if (next) {
                next.prev = prev;
            }
            
            if (node === this.head) {
                this.head = next;
            }

            if (node === this.tail) {
                this.tail = prev;
            }

            node.next = undefined;
            node.prev = undefined;
        }

        return node?.value;
    }

    private createNode(item: T): Node<T> {
        return { value: item };
    }

    private getNode(idx: number): Node<T> | undefined {
        if (idx < 0) { return; }
        let node = this.head;

        for (let i=0; i<idx; ++i) {
            node = node?.next;
        }

        return node;
    }
}