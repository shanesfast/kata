export default function bubble_sort(arr: number[]): void {
    // outer and inner for loops
    // outer = current value
    // inner = all other values to compare to current
    for (let i=0; i<arr.length; ++i) {
        for (let k=i+1; k<arr.length; ++k) {
            if (arr[i] > arr[k]) {
                let temp = arr[i];
                arr[i] = arr[k];
                arr[k] = temp;
            }
        }
    }
}