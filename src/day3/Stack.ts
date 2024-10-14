type Node<T> = {
    val: T,
    prev?: Node<T>
}

export default class Stack<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
    }

    push(item: T): void {
        ++this.length;
        const node = { val: item } as Node<T>;

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        node.prev = this.tail;
        this.tail = node;
    }

    pop(): T | undefined {
        this.length = Math.max(0, this.length - 1);

        const pop = this.tail;
        this.tail = pop?.prev;

        return pop?.val;
    }

    peek(): T | undefined {
        return this.tail?.val;
    }
}