type Node<T> = {
    value: T,
    next?: Node<T>;
    prev?: Node<T>;
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
        const node = this.getNode(idx);

        if (!node) { 
            this.append(item);
            return; 
        }

        if (node === this.head) {
            this.prepend(item);
            return;
        }

        let newNode = { value: item } as Node<T>;
        ++this.length;

        newNode.prev = node.prev;
        newNode.next = node;
        node.prev = newNode;
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

        if (node) {
            this.removeNode(node);
            this.length = Math.max(0, this.length - 1);
        }

        return node?.value;
    }

    get(idx: number): T | undefined {
        return this.getNode(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        const node = this.getNode(idx);

        if (node) { 
            this.removeNode(node); 
            this.length = Math.max(0, this.length - 1);
        }

        return node?.value;
    }

    print(): void {
        console.log("Print not implemented!");
    }

    private getNode(idx: number): Node<T> | undefined {
        let node = this.head;

        while (node && idx > 0) {
            node = node.next
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
}