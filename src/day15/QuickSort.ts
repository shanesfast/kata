function qs(arr: number[], low: number, high: number): void {
    if (low >= high) { return; }

    const pivot = partition(arr, low, high);

    // go left
    qs(arr, low, pivot - 1);
    // go right
    qs(arr, pivot + 1, high);
}

function partition(arr: number[], low: number, high: number): number {
    const pIndex = high; // could find a better pivot, but this is just for quick implementation
    const pVal = arr[pIndex];
    let index = low - 1; // used to keep track of new partition boundary

    // partition from low to high
    for (let i=low; i<high; ++i) {
        if (arr[i] <= pVal) {
            ++index;
            let temp = arr[i];
            arr[i] = arr[index];
            arr[index] = temp;
        }
    }

    // set pivot to end of new partition
    ++index;
    arr[pIndex] = arr[index];
    arr[index] = pVal;

    // return final location of pivot
    return index;
}

export default function quick_sort(arr: number[]): void {
    return qs(arr, 0, arr.length - 1);
}