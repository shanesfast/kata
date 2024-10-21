function qs(arr: number[], low: number, high: number): void {
    if (low >= high) { return; }

    const pivotIndex = partition(arr, low, high);

    // left side
    qs(arr, low, pivotIndex - 1);

    // right side
    qs(arr, pivotIndex + 1, high);
}

function partition(arr: number[], low: number, high: number): number {
    let pivotIndex = high; // possible to choose a better pivot index but for now this is easiest
    let i = low - 1;

    for (let k=i+1; k<high; ++k) {
        if (arr[k] <= arr[pivotIndex]) {
            ++i;
            let temp = arr[i];
            arr[i] = arr[k];
            arr[k] = temp;
        }
    }

    // place pivot at the end of the new partition
    ++i;
    let temp = arr[pivotIndex];
    arr[pivotIndex] = arr[i];
    arr[i] = temp;

    return i;
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}