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
        const node = this.createNode(item);
        ++this.length;

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        this.head.prev = node;
        node.next = this.head;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        let target = this.getNode(idx);

        if (!target) {
            this.append(item);
            return;
        }

        const node = this.createNode(item);
        ++this.length;

        node.next = target;

        if (target.prev) { target.prev.next = node; }
        else { this.head = node; }

        target.prev = node;
    }

    append(item: T): void {
        const node = this.createNode(item);
        ++this.length;

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

        let idx = 0;
        while (node && node.value !== item) {
            node = node.next;
            ++idx;
        }

        if (!node) { return; }

        this.length = Math.max(this.length - 1);
        this.removeNode(node);
        return node?.value;
    }

    get(idx: number): T | undefined {
        return this.getNode(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        const node = this.getNode(idx);
        if (!node) { return; }

        this.length = Math.max(this.length - 1);
        this.removeNode(node);

        return node?.value;
    }

    private getNode(idx: number): Node<T> | undefined {
        let node = this.head;

        while (idx > 0) {
            node = node?.next;
            --idx;
        }

        return node;
    }

    private removeNode(node: Node<T>): void {
        if (node.prev) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }

        node.next = undefined;
        node.prev = undefined;
    }

    private createNode(value: T): Node<T> {
        return { value };
    }
}