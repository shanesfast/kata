type Node<T> = {
    value: T,
    prev?: Node<T>,
    next?: Node<T>
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
        const node = { value: item } as Node<T>;

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        this.head.prev = node;
        node.next = this.head;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        const target = this.getNode(idx);

        if (!target) {
            this.append(item);
            return;
        }

        ++this.length;
        const node = { value: item } as Node<T>;

        if (!target.prev) {
            this.head = node;
        } else {
            target.prev.next = node;
        }

        node.next = target;
        target.prev = node;
    }

    append(item: T): void {
        ++this.length;
        const node = { value: item } as Node<T>;

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

        while (node && node.value !== item) {
            node = node.next;
        }

        return this.removeNode(node)?.value;
    }

    get(idx: number): T | undefined {
        return this.getNode(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        return this.removeNode(this.getNode(idx))?.value;
    }

    print(): void {

    }

    private getNode(idx: number): Node<T> | undefined {
        let node = this.head;

        while (node && idx > 0) {
            node = node.next;
            --idx;
        }

        return node;
    }

    private removeNode(node: Node<T> | undefined): Node<T> | undefined {
        if (!node) { return; }

        this.length = Math.max(0, this.length - 1);

        if (node.next) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }

        if (node.prev) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }

        node.next = node.prev = undefined;
        return node;
    }
}