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
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        ++this.length;

        const node = { value: item } as Node<T>;

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        ++this.length;

        const node = { value: item } as Node<T>;
        let nodeAtIndex = this.head;

        // if list is empty
        if (!nodeAtIndex) {
            this.head = this.tail = node;
            return;
        }
        
        // get node at idx
        for (let i=0; i<=idx && i<this.length; ++i) {
            let nextNode: Node<T> | undefined = nodeAtIndex?.next;

            if (!nextNode) { break; }

            nodeAtIndex = nextNode;
        }

        let nodeBeforeIndex = nodeAtIndex.prev;

        if (!nodeBeforeIndex) { // we are inserting at the beginning of the linked list
            nodeAtIndex.prev = node;
            node.next = nodeAtIndex;
            this.head = node;
        } else {
            node.next = nodeAtIndex;
            node.prev = nodeBeforeIndex;
            nodeBeforeIndex.next = node;
            nodeAtIndex.prev = node;
        }

        if (!nodeAtIndex.next) {
            this.tail = nodeAtIndex;
        }
    }

    append(item: T): void {
        ++this.length;
        const newNode = { value: item } as Node<T>;

        if (!this.head) {
            this.head = this.tail = newNode;
            return;
        }

        // Get the last node in the linked list
        let node = this.head as Node<T>;
        while (node.next) {
            node = node.next;
        }

        newNode.prev = node;
        node.next = newNode;
        this.tail = newNode;
    }

    remove(item: T): T | undefined {
        if (!this.head) {
            return;
        }

        let removeNode;
        let node = this.head as Node<T> | undefined;

        while (node) {
            if (node.value === item) {
                removeNode = node;
                break;
            }

            node = node.next;
        }

        if (removeNode) {
            let prev = removeNode.prev;
            let next = removeNode.next;

            if (prev) {
                prev.next = next;
            } else { // the node to be removed must be at the head
                this.head = next;
            }
            
            if (next) {
                next.prev = prev;
            } else { // node to be removed must be the tail
                this.tail = prev;
            }
            
            removeNode.prev = undefined;
            removeNode.next = undefined;
            this.length = Math.max(0, this.length - 1);
        }

        return removeNode?.value;
    }

    get(idx: number): T | undefined {
        if (idx >= this.length) { return; }

        let node = this.head;
        let i = 0;

        while (node && i !== idx) {
            node = node.next;
            ++i;
        }

        return node?.value;
    }
    
    removeAt(idx: number): T | undefined {
        if (idx >= this.length) { return; }

        --this.length;

        let nodeAtIndex = this.head;

        if (!nodeAtIndex) { return; } // list is empty
        
        // get node at idx
        for (let i=0; i<idx; ++i) {
            let nextNode: Node<T> | undefined = nodeAtIndex?.next;

            if (!nextNode) { break; }

            nodeAtIndex = nextNode;
        }

        let nodeBeforeIndex = nodeAtIndex.prev;
        let nodeAfterIndex = nodeAtIndex.next;

        if (!nodeBeforeIndex) { // we are removing from the beginning of the linked list
            this.head = nodeAtIndex.next;

            if (this.head) {
                this.head.prev = undefined;
            }
        } else {
            nodeBeforeIndex.next = nodeAfterIndex;
            
            if (nodeAfterIndex) {
                nodeAfterIndex.prev = nodeBeforeIndex;
            } else { // must be the tail
                this.tail = nodeBeforeIndex;
            }

            nodeAtIndex.prev = undefined;
            nodeAtIndex.next = undefined;
        }

        return nodeAtIndex.value;
    }
}
