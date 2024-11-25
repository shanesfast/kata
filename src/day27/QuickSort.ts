export default function quick_sort(arr: number[], low: number = 0, high: number = arr.length - 1): void {
    if (low >= high) { return; }

    const pivot = partition(arr, low, high);

    quick_sort(arr, pivot + 1, high);
    quick_sort(arr, low, pivot - 1);
}

function partition(arr: number[], low: number, high: number): number {
    const pivotIdx = high; // there are other means of finding better pivot points. Choosing high to save time.
    const pivotVal = arr[pivotIdx];
    let index = low - 1;

    for (let i=low; i<high; ++i) {
        if (arr[i] <= pivotVal) {
            ++index;
            let temp = arr[index];
            arr[index] = arr[i];
            arr[i] = temp;
        }
    }

    ++index;
    arr[pivotIdx] = arr[index];
    arr[index] = pivotVal;

    return index;
}
