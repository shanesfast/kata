export default function bs_list(haystack: number[], needle: number, low: number = 0, high: number = haystack.length): boolean {
    // Input array must be sorted for binary search to work
    // in this case, sorted in ascending order

    if (low >= high) { return false; }

    const mid = Math.floor(low + ((high - low) / 2));
    const val = haystack[mid];

    if (val === needle) { return true; }

    if (val < needle) { low = mid + 1; }
    else { high = mid; }

    return bs_list(haystack, needle, low, high);
}