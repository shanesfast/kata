export default function bs_list(haystack: number[], needle: number, low: number = 0, high: number = haystack.length): boolean {
    if (low >= high) { return false; }

    const mid = Math.floor(low + ((high - low) / 2));
    const midVal = haystack[mid];

    if (midVal === needle) {
        return true;
    }

    if (midVal < needle) { low = mid + 1; }
    else { high = mid; }

    return bs_list(haystack, needle, low, high);
}