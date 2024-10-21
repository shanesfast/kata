function bs(arr: number[], needle: number, low: number, high: number): boolean {
    if (low >= high) { return false; }

    const mid = Math.floor(low + (high - low) / 2);
    const val = arr[mid];

    if (val === needle) { return true; }

    if (val < needle) { low = mid + 1; }
    else { high = mid - 1; }

    return bs(arr, needle, low, high);
}

export default function bs_list(haystack: number[], needle: number): boolean {
    return bs(haystack, needle, 0, haystack.length);
}