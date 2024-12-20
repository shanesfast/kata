export default function quick_sort(arr: number[], low: number = 0, high: number = arr.length - 1): void {
    if (low >= high) { return; }

    const pivot = partition(arr, low, high);

    quick_sort(arr, pivot + 1, high);
    quick_sort(arr, low, pivot - 1);
}

function partition(arr: number[], low: number, high: number): number {
    const p = high;
    const pVal = arr[p];
    let index = low - 1;

    for (let i=low; i<high; ++i) {
        if (arr[i] <= pVal) {
            ++index;
            let temp = arr[i];
            arr[i] = arr[index];
            arr[index] = temp;
        }
    }

    ++index;
    arr[p] = arr[index];
    arr[index] = pVal;

    return index;
}
