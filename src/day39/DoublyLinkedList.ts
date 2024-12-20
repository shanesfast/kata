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

        node.next = target;
        if (!target.prev) { this.head = node; }
        node.prev = target.prev;
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

        if (!node) { return; }

        this.length = Math.max(0, this.length - 1);
        this.removeNode(node);

        return node.value;
    }

    get(idx: number): T | undefined {
        return this.getNode(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        const node = this.getNode(idx);

        if (node) {
            this.length = Math.max(0, this.length - 1);
            this.removeNode(node);
        }

        return node?.value;
    }

    print(): void {

    }

    private getNode(idx: number): Node<T> | undefined {
        let node = this.head;

        while (idx > 0 && node) {
            node = node.next;
            --idx;
        }

        return node;
    }

    private removeNode(node: Node<T>): Node<T> {
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

        node.next = node.prev = undefined;
        return node;
    }
}

type Node<T> = {
    value: T,
    prev?: Node<T>,
    next?: Node<T>
}
