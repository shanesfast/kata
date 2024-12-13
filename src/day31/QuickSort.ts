function partition(arr: number[], low: number, high: number): number {
    const pIdx = high; // could use a different pivot strategy, but this is easiest 
    const pVal = arr[pIdx];
    let index = low - 1;

    for (let i=low; i<high; ++i) {
        if (pVal > arr[i]) {
            ++index;
            let temp = arr[i];
            arr[i] = arr[index];
            arr[index] = temp;
        }
    }

    ++index;
    arr[pIdx] = arr[index];
    arr[index] = pVal;

    return index;
}

export default function quick_sort(arr: number[], low: number = 0, high: number = arr.length - 1): void {
    if (low >= high) { return; }

    const pivot = partition(arr, low, high);

    quick_sort(arr, pivot + 1, high);
    quick_sort(arr, low, pivot - 1);
}
