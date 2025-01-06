export default function merge_sort(arr: number[], left: number = 0, right: number = arr.length - 1): void {
    if (left >= right) { return; }

    const mid = Math.floor(left + (right - left) / 2);

    merge_sort(arr, left, mid);
    merge_sort(arr, mid + 1, right);
    m(arr, left, mid, right);
}

function m(arr: number[], left: number, mid: number, right: number): void {
    const lLen = mid - left + 1;
    const rLen = right - mid;

    const lArr = new Array(lLen);
    const rArr = new Array(rLen);

    // populate left + right arrays
    for (let i=0; i<lLen; ++i) {
        lArr[i] = arr[left + i];
    }

    for (let i=0; i<rLen; ++i) {
        rArr[i] = arr[mid + i + 1];
    }

    // merge left + right arrays into original array
    let idx = left;
    left = 0;
    right = 0;

    while (left < lLen && right < rLen) {
        if (lArr[left] < rArr[right]) {
            arr[idx] = lArr[left];
            ++left;
        } else {
            arr[idx] = rArr[right];
            ++right;
        }

        ++idx;
    }

    // merge remaining left array elements
    while (left < lLen) {
        arr[idx] = lArr[left];
        ++left;
        ++idx;
    }

    // merge remaining right array elements
    while (right < rLen) {
        arr[idx] = rArr[right];
        ++right;
        ++idx;
    }
}
