export default function bs_list(haystack: number[], needle: number, low: number = 0, high: number = haystack.length): boolean {
    if (low >= high) { return false; }

    const midIdx = Math.floor(low + ((high - low) /2));
    const midVal = haystack[midIdx];

    if (midVal === needle) { return true; }

    if (midVal < needle) { low = midIdx + 1; }
    else { high = midIdx; }

    return bs_list(haystack, needle, low, high);
}