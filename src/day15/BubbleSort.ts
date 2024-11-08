export default function bubble_sort(arr: number[]): void {
    // inner + outer loops
    // outer tracks current, which bubbles to the right
    // inner compares every other value to current, swapping with current if it is less than
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