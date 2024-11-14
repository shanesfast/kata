"use strict";
exports.__esModule = true;
var MaxHeap = /** @class */ (function () {
    function MaxHeap() {
        this.data = [];
    }
    Object.defineProperty(MaxHeap.prototype, "length", {
        get: function () { return this.data.length; },
        enumerable: false,
        configurable: true
    });
    MaxHeap.prototype.top = function () {
        return this.data[0];
    };
    MaxHeap.prototype.insert = function (value) {
        this.data.push(value);
        this.heapUp(this.length - 1);
    };
    MaxHeap.prototype["delete"] = function () {
        var node = this.data[0];
        // move last element to the top of the heap
        // then restore order by heaping down
        this.data[0] = this.data[this.length - 1];
        this.data.pop();
        this.heapDown(0);
        return node;
    };
    MaxHeap.prototype.heapUp = function (idx) {
        if (idx < 0) {
            return;
        }
        var pIdx = this.parent(idx);
        var pVal = this.data[pIdx];
        var val = this.data[idx];
        if (pVal[0] < val[0]) {
            this.data[pIdx] = val;
            this.data[idx] = pVal;
            this.heapUp(pIdx);
        }
    };
    MaxHeap.prototype.heapDown = function (idx) {
        if (idx >= this.length) {
            return;
        }
        var l = this.leftChild(idx);
        var r = this.rightChild(idx);
        var lVal = this.data[l];
        var rVal = this.data[r];
        var val = this.data[idx];
        if (rVal[0] < lVal[0] && val[0] < lVal[0]) {
            this.data[l] = val;
            this.data[idx] = lVal;
            this.heapDown(l);
        }
        if (lVal[0] < rVal[0] && val[0] < rVal[0]) {
            this.data[r] = val;
            this.data[idx] = rVal;
            this.heapDown(r);
        }
    };
    MaxHeap.prototype.parent = function (idx) {
        return Math.floor((idx - 1) / 2);
    };
    MaxHeap.prototype.leftChild = function (idx) {
        return Math.floor((idx * 2) + 1);
    };
    MaxHeap.prototype.rightChild = function (idx) {
        return Math.floor((idx * 2) + 2);
    };
    return MaxHeap;
}());
exports["default"] = MaxHeap;
