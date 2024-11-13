function qs(arr: number[], low: number, high: number): void {
    if (low >= high) { return; }

    const pivot = partition(arr, low, high);

    qs(arr, pivot + 1, high);
    qs(arr, low, pivot - 1);
}

function partition(arr: number[], low: number, high: number): number {
    const pIndex = high; // could calculate a pivot point in the middle of the array for consistently better results
    const pVal = arr[pIndex];
    let index = low - 1;

    // walk "partition" from low to high and swap values that are
    // smaller than the pivot to the left
    for (let i=low; i<high; ++i) {
        if (arr[i] <= pVal) {
            ++index;

            let temp = arr[index];
            arr[index] = arr[i];
            arr[i] = temp;
        }
    }

    // move pivot value to the end of the new "partition"
    // created in the loop above
    // be sure to adjust the index var so that the last swapped value remains in the partition
    ++index;
    arr[pIndex] = arr[index];
    arr[index] = pVal;

    return index;
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
