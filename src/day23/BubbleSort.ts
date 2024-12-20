export default function bubble_sort(arr: number[]): void {
    // inner + outer loops
    // outer tracks "bubbling" value as it moves right in the array
    // inner loop tracks the values being compared to the "bubbling" value
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