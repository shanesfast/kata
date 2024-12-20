export default function merge_sort(arr: number[], left: number = 0, right: number = arr.length - 1): void {
    if (left >= right) { return; }

    const mid = Math.floor(left + (right - left) / 2);

    merge_sort(arr, left, mid);
    merge_sort(arr, mid + 1, right);
    merge(arr, left, right, mid);
}

function merge(arr: number[], left: number, right: number, mid: number): void {
    const leftLen = mid - left + 1;
    const rightLen = right - mid;

    // create left + right array copies
    const lArr = new Array(leftLen);
    const rArr = new Array(rightLen);

    // fill left array copy
    for (let i=0; i<leftLen; ++i) {
        lArr[i] = arr[left + i];
    }

    // fill right array copy
    for (let i=0; i<rightLen; ++i) {
        rArr[i] = arr[mid + 1 + i];
    }

    // merge the two back into original array
    let index = left;
    left = 0;
    right = 0;

    while (left < leftLen && right < rightLen) {
        if (lArr[left] <= rArr[right]) {
            arr[index] = lArr[left];
            ++left;
        } else {
            arr[index] = rArr[right];
            ++right;
        }

        ++index;
    }

    // merge remaining elements in left array if any
    while (left < leftLen) {
        arr[index] = lArr[left];
        ++left;
        ++index;
    }

    // merge remaining elements in right array if any
    while (right < rightLen) {
        arr[index] = rArr[right];
        ++right;
        ++index;
    }
}
