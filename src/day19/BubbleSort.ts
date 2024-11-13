export default function bubble_sort(arr: number[]): void {
    // inner / outer loops
    // outer tracks "bubbling" value
    // inner compares all other values to the right of the "bubble" and swaps with it if less than

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