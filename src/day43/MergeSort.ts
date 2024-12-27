export default function merge_sort(arr: number[], left: number = 0, right: number = arr.length - 1): void {
    if (left >= right) { return; }

    const mid = Math.floor(left + (right - left) / 2);

    merge_sort(arr, left, mid);
    merge_sort(arr, mid + 1, right);
    m(arr, left, mid, right);
}

function m(arr: number[], left: number, mid: number, right: number): void {
    const leftLen = mid - left + 1;
    const rightLen = right - mid;

    const lArr = new Array(leftLen);
    const rArr = new Array(rightLen);

    // fill leftArr
    for (let i=0; i<leftLen; ++i) {
        lArr[i] = arr[left + i];
    }

    // fill rightArr
    for (let i=0; i<rightLen; ++i) {
        rArr[i] = arr[mid + i + 1];
    }

    // merge left+right Arr back into original Arr
    let idx = left;
    left = 0;
    right = 0;

    while (left < leftLen && right < rightLen) {
        if (lArr[left] < rArr[right]) {
            arr[idx] = lArr[left];
            ++left;
        } else {
            arr[idx] = rArr[right];
            ++right;
        }

        ++idx;
    }

    // merge remaining leftArr elements
    while (left < leftLen) {
        arr[idx] = lArr[left];
        ++left;
        ++idx;
    }

    // merge remaining rightArr elements
    while (right < rightLen) {
        arr[idx] = rArr[right];
        ++right;
        ++idx;
    }
}