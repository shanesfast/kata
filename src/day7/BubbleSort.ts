export default function bubble_sort(arr: number[]): void {
    // 2 loops: inner & outer
    // outer: tracks value that is "bubbling" to the right
    // inner: compares all remaining values to "bubbling" value

    for (let i=0; i<arr.length; ++i) {
        for (let k=i+1; k<arr.length; ++k) {
            // swap the outer loop value "i" to the right if it is greater than the comparing "k" value
            if (arr[i] > arr[k]) {
                let temp = arr[i];
                arr[i] = arr[k];
                arr[k] = temp;
            }
        }
    }
}