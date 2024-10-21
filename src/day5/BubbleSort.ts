export default function bubble_sort(arr: number[]): void {
    // 2 loops, outer and inner loop
    // outer loop tracks the value which is "bubbling" to the right
    // inner loop tracks the values being compared to the "bubbling" value
    for (let i=0; i<arr.length; ++i) {
        for (let k=i+1; k<arr.length; ++k) {
            if (arr[i] > arr[k]) {
                let temp = arr[k];
                arr[k] = arr[i];
                arr[i] = temp;
            }
        }
    }
}
