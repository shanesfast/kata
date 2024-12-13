export default function insertion_sort(arr: number[]): void {
    for (let i=0; i<arr.length; ++i) {
        let curr = arr[i];
        let k = i - 1;

        for (; k >= 0 && arr[k] > curr; --k) {
            arr[k+1] = arr[k];
        }

        arr[k+1] = curr;
    }
}