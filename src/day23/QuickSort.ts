function qs(arr: number[], low: number, high: number): void {
     if (low >= high) { return; }

     const pivot = partition(arr, low, high);

     // left side
     qs(arr, low, pivot - 1);
     // right side
     qs(arr, pivot + 1, high);
}

function partition(arr: number[], low: number, high: number): number {
    // since we are choosing a different pivot, you must swap the chosen pivot to the end of the array 
    // so that the partitioning will work as expected
    const pivot = Math.floor(low + (high - low) / 2); 
    [arr[high], arr[pivot]] = [arr[pivot], arr[high]];

    const pIdx = high;
    const pVal = arr[high];
    let index = low - 1; // adjusted for looping convenience

    // keep track of the last index in the partition
    for (let i=low; i<=high; ++i) {
        if (arr[i] < pVal) {
            ++index;
            let temp = arr[i];
            arr[i] = arr[index];
            arr[index] = temp;
        }
    }

    // set the pivot value to the end of the new partition - this is why we tracked the end of the new partition in the loop
    ++index;
    arr[pIdx] = arr[index];
    arr[index] = pVal;

    // return the new pivot index
    return index;
}

export default function quick_sort(arr: number[]): void {
    // this will sort the arr "in place", so no need to return anything
    qs(arr, 0, arr.length - 1);
}

function print(arr: number[], low: number, high: number, pivot: number): void {
    let str = '';
    for (let i=low; i<=high; ++i) {
        str += `${arr[i]}, `;
    }
    console.log(str);
    console.log(`Pivot: ${pivot}`);
}
