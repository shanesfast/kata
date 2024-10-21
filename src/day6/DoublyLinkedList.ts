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
        const node = { val: item } as Node<T>;

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
        const newNode = { val: item } as Node<T>;

        if (!target) {
            throw new Error("Index does not exist. Operation failed.");
        }

        // node will be added if a target exists at the given index
        ++this.length;

        const beforeTarget = target.prev;

        if (!beforeTarget) { // must be the head if no previous node to the target
            newNode.next = target;
            target.prev = newNode;
            this.head = newNode;
            return;
        }

        beforeTarget.next = newNode;
        newNode.prev = beforeTarget;
        newNode.next = target;
        target.prev = newNode;
    }

    append(item: T): void {
        ++this.length;
        const node = { val: item } as Node<T>;

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        let target;
        let node = this.head;
        let i = 0;

        while (i<this.length && node) {
            if (node.val === item) { 
                target = node; 
                break;
            }

            ++i;
            node = node.next;
        }

        if (target) {
            this.removeAt(i);
        }

        return target?.val;
    }

    get(idx: number): T | undefined {
        return this.getNode(idx)?.val;
    }

    removeAt(idx: number): T | undefined {
        const target = this.getNode(idx);

        if (!target) {
            throw new Error("Index does not exist. Operation failed.");
        }

        // node will be removed if a target exists at the given index
        --this.length;

        const beforeTarget = target.prev;
        const afterTarget = target.next;

        if (beforeTarget) {
            beforeTarget.next = afterTarget;
        } else { // must be the head if no previous node to target
            this.head = target.next;
        }
        
        if (afterTarget) {
            afterTarget.prev = beforeTarget;
        } else { // must be the tail if no node after target
            this.tail = target.prev;
        }
        
        target.prev = undefined;
        target.next = undefined;

        return target?.val;
    }

    private getNode(idx: number): Node<T> | undefined {
        if (idx >= this.length) { return; }

        let node = this.head;

        for (let i=0; i<idx; ++i) {
            node = node?.next;
        }

        return node;
    }
}