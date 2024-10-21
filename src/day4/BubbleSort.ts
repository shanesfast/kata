export default function bubble_sort(arr: number[]): void {
    // nested loops
    // outer loop will track the value being "bubbled" to the right
    for (let i=0; i<arr.length; ++i) {
        // inner loop compares current value to every other value
        for (let k=i+1; k<arr.length; ++k) {
            // swap current value if it is greater than comparing value
            if (arr[k] < arr[i]) {
                const temp = arr[k];
                arr[k] = arr[i];
                arr[i] = temp;
            }
        }
    }
}