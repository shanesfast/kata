function qs(arr: number[], left: number, right: number): void {
    if (left >= right) { return; }

    const pivot = partition(arr, left, right);

    // left side
    qs(arr, left, right - 1);

    // right side
    qs(arr, left + 1, right);
}

// returns the pivot index
function partition(arr: number[], low: number, high: number) {
    const pivot = arr[high]; // would be better to pick an element in the middle, but for time's sake...
    let index = low - 1; // start 1 less than low so we can include the low element value in the loop

    for (let i=low; i<high; ++i) {
        if (arr[i] <= pivot) {
            ++index; // adjust the index when we find a value to swap 
            const temp = arr[i];
            arr[i] = arr[index];
            arr[index] = temp;
        }
    }

    // swap the pivot value to the end of the new partition
    // remember everything to the left is lower than or equal to the pivot
    // and everything to the right is greater than the pivot
    ++index;
    arr[high] = arr[index];
    arr[index] = pivot;

    return index;
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}