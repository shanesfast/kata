export default function bubble_sort(arr: number[]): void {
    // nested loops
    // outer tracks each index for bubbling to the right if needed
    // inner tracks comparing current index to every other value to the right of it
    // sorting happens "in place"

    for (let i=0; i<arr.length; ++i) {
        for (let k=i+1; k<arr.length; ++k) {
            if (arr[k] < arr[i]) {
                // perform swap
                let temp = arr[k];
                arr[k] = arr[i];
                arr[i] = temp;
            }
        }
    }
}