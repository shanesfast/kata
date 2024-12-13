export default function insertion_sort(arr: number[]): void {
    for (let i=0; i<arr.length; ++i) {
        let curr = arr[i];
        let j = i - 1;

        // move arr[i] (curr) to the left while it is less than j
        // decrement j so that curr is compared to all values to the left of curr
        for (; j>=0 && curr < arr[j]; --j) {
            arr[j+1] = arr[j];
        }

        arr[j + 1] = curr;
    }
}