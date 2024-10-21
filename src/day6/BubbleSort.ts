export default function bubble_sort(arr: number[]): void {
    // 2 loops: outer and inner
    // outer tracks the "bubbling" value
    // inner tracks comparison values to the "bubbling" value

    for (let i=0; i<arr.length; ++i) {
        for (let k=i+1; k<arr.length; ++k) {
            if (arr[i] > arr[k]) { // if outer loop values is greater, swap it to the right
                const temp = arr[i];
                arr[i] = arr[k];
                arr[k] = temp;
            }
        }
    }
}