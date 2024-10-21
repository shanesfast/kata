function qs(arr: number[], low: number, high: number): void {
    if (low >= high) { return; }

    partition(arr, low, high);

    // sort left side
    qs(arr, low, high - 1);

    // sort right side
    qs(arr, low + 1, high);
}

// this function swaps values "in place" so that the next time you recursively call "qs()", you will be operating on a different order of values
function partition(arr: number[], low: number, high: number) {
    const pivot = arr[high]; // it is possible to find a better pivot index than just the "high" value
    let index = low - 1; // track the index of the value that is being swapped

    for (let i=low; i<high; ++i) { // loop over the entire array partition (bounded by low and high)
        if (arr[i] <= pivot) { // if the current value is less than or equal to the pivot value, move it to the left
            ++index; // make sure to adjust the tracking index
            const temp = arr[i];
            arr[i] = arr[index];
            arr[index] = temp;
        }
    }

    // place the current pivot value at the end of the "left" partition
    // everything to the right of the pivot value after is the "right" partition (greater than the pivot value)
    ++index;
    arr[high] = arr[index];
    arr[index] = pivot;
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
