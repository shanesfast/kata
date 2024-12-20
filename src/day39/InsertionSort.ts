export default function insertion_sort(arr: number[]): void {
    for (let i=0; i<arr.length; ++i) {
        const curr = arr[i];
        let k = i - 1;

        while (k >= 0 && curr < arr[k]) {
            arr[k + 1] = arr[k];
            --k;
        }

        arr[k + 1] = curr;
    }
}