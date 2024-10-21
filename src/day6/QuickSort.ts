function qs(arr: number[], low: number, high: number): void {
    if (low >= high) { return; }

    const pivotIndex = partition(arr, low, high);

    // left side
    qs(arr, low, pivotIndex - 1);

    // right side
    qs(arr, pivotIndex + 1, high);
}

// return the pivot index after partitioning is done
function partition(arr: number[], low: number, high: number): number {
    // just use the high value as the pivot for simplicity
    const pivot = arr[high];
    // set the tracking index 1 lower than low for looping convenience
    let index = low - 1;

    // loop up to the pivot's index, swapping when you find values less than or equal to the pivot value
    for (let i=low; i<high; ++i) {
        if (arr[i] <= pivot) {
            ++index;
            const temp = arr[i];
            arr[i] = arr[index];
            arr[index] = temp;
        }
    }

    // place the pivot at the end of the established lesser partition
    ++index;
    arr[high] = arr[index];
    arr[index] = pivot;

    return index;
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
