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

    const l = new Array(leftLen);
    const r = new Array(rightLen);

    // fill left array
    for (let i=0; i<leftLen; ++i) {
        l[i] = arr[left + i];
    }

    // fill right array
    for (let i=0; i<rightLen; ++i) {
        r[i] = arr[mid + i + 1];
    }

    // merge l and r arrays into original array
    let idx = left;
    left = 0;
    right = 0;

    while (left < leftLen && right < rightLen) {
        if (l[left] < r[right]) {
            arr[idx] = l[left];
            ++left;
        } else {
            arr[idx] = r[right];
            ++right;
        }

        ++idx;
    }

    // merge remaining l array elems
    while (left < leftLen) {
        arr[idx] = l[left];
        ++left;
        ++idx;
    }

    // merge remaining r array elems
    while (right < rightLen) {
        arr[idx] = r[right];
        ++right;
        ++idx;
    }
}