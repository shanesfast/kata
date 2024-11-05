function qs(arr: number[], low: number, high: number): void {
    if (low >= high) { return; }

    // partition array and get new pivot index
    const pivotIndex = partition(arr, low, high);

    // left
    qs(arr, low, pivotIndex - 1);
    // right
    qs(arr, pivotIndex + 1, high);
}

function partition(arr: number[], low: number, high: number): number {
    let pivotIndex = high; // could find a better pivot index but for simplicity
    let pivotVal = arr[pivotIndex];
    let index = low - 1; // setting lower by 1 makes looping logic cleaner

    // swap values less then pivot to the left side of array
    for (let i=low; i<high; ++i) {
        if (arr[i] <= pivotVal) {
            ++index;
            let temp = arr[i];
            arr[i] = arr[index];
            arr[index] = temp;
        }
    }

    // place pivot at the end of the "left partition"
    ++index;
    arr[pivotIndex] = arr[index];
    arr[index] = pivotVal;

    // return index of the new pivot position
    return index;
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}