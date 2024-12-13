export default function insertion_sort(arr: number[]): void {
    for (let i=0; i<arr.length; ++i) {
        let curr = arr[i];
        let j = i - 1;
        
        for (; j>=0 && curr < arr[j]; --j) {
            arr[j+1] = arr[j];
        }

        arr[j+1] = curr;
    }
}
