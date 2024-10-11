"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Queue = /** @class */ (function () {
    function Queue() {
        this.head = this.tail = undefined;
        this.length = 0;
    }
    Queue.prototype.enqueue = function (item) {
        var node = { value: item };
        ++this.length;
        if (!this.tail) {
            this.tail = this.head = node;
            return;
        }
        this.tail.next = node;
        this.tail = node;
    };
    Queue.prototype.deque = function () {
        if (!this.head) {
            return undefined;
        }
        --this.length;
        if (this.length < 1) {
            this.tail = undefined;
        }
        var head = this.head;
        this.head = this.head.next;
        // if JS wasn't garbo collected:
        head.next = undefined;
        return head.value;
    };
    Queue.prototype.peek = function () {
        var _a;
        return (_a = this.head) === null || _a === void 0 ? void 0 : _a.value;
    };
    return Queue;
}());
exports.default = Queue;

    const list = new Queue();

    list.enqueue(5);
    list.enqueue(7);
    list.enqueue(9);

    list.deque();
    list.length;

    // this must be wrong..?
    debugger;

    list.enqueue(11);
    list.deque();
    list.deque();
    list.peek();
    list.deque();
    list.deque();

    console.log(list);
    list.enqueue(69);
    console.log(list);
