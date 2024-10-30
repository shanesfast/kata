function qs(arr: number[], low: number, high: number): void {
    if (low >= high) { return; }

    const pivotIndex = partition(arr, low, high);

    // left side
    qs(arr, low, pivotIndex - 1);

    // right side
    qs(arr, pivotIndex + 1, high);
}

function partition(arr: number[], low: number, high: number): number {
    let pivotIndex = high;
    let index = low - 1;

    for (let i=index + 1; i<high; ++i) {
        if (arr[i] <= arr[pivotIndex]) {
            ++index;
            let temp = arr[i];
            arr[i] = arr[index];
            arr[index] = temp;
        }
    }

    // place pivot at the end of the new partition
    ++index;
    let temp = arr[pivotIndex];
    arr[pivotIndex] = arr[index];
    arr[index] = temp;

    return index;
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}