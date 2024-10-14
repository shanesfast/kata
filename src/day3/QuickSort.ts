function qs(arr: number[], low: number, high: number): void {
    // base case is when low === high
    if (low >= high) {
        return;
    }

    // get new pivot index
    const pivotIndex = partition(arr, low, high);

    // sort left side: 
    // do not include the previous pivot in the next recursive call (subtract 1 from prior pivot index)
    qs(arr, low, pivotIndex - 1);
    
    // sort right side:
    // do not include the previous pivot (add 1 to prior pivot index)
    qs(arr, pivotIndex + 1, high);
}

// returns the index of the pivot after partitioning
function partition(arr: number[], low: number, high: number): number {
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
    // using recursion to perform the quick sort operation
    qs(arr, 0, arr.length -1);
}