export default function merge_sort(arr: number[], left: number = 0, right: number = arr.length - 1): void {
    if (left >= right) { return; }

    const mid = Math.floor(left + (right - left) / 2);
    merge_sort(arr, left, mid);
    merge_sort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

function merge(arr: number[], left: number, mid: number, right: number) {
    // establish lengths for divided array partitions 
    const leftLen = mid - left + 1;
    const rightLen = right - mid;

    // create temp arrays
    const lArr = new Array(leftLen);
    const rArr = new Array(rightLen);

    // copy data to the temp arrays
    for (let i=0; i<leftLen; ++i) {
        lArr[i] = arr[left + i];
    }

    for (let i=0; i<rightLen; ++i) {
        rArr[i] = arr[mid + 1 + i];
    }

    // merge temp arrays back into original array
    let i = 0;
    let k = 0;
    let l = left;

    while (i < leftLen && k < rightLen) {
        if (lArr[i] <= rArr[k]) {
            arr[l] = lArr[i];
            ++i;
        } else {
            arr[l] = rArr[k];
            ++k;
        }

        ++l;
    }

    // copy remaining elements of lArr if any
    while (i < leftLen) {
        arr[l] = lArr[i];
        ++i;
        ++l;
    }

    // copy remaining elements of rArr if any
    while (k < rightLen) {
        arr[l] = rArr[k];
        ++k;
        ++l;
    }
}
