export default function insertion_sort(arr: number[]): void {
    for (let i=0; i<arr.length; ++i) {
        const curr = arr[i];
        let idx = i - 1;

        while (i >= 0 && curr < arr[idx]) {
            arr[idx + 1] = arr[idx];
            --idx;
        }

        arr[idx + 1] = curr;
    }
}