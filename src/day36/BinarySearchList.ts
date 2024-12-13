export default function bs_list(haystack: number[], needle: number, low: number = 0, high: number = haystack.length): boolean {
    if (low >= high) { return false; }

    const mid = Math.floor(low + ((high - low) / 2));
    if (haystack[mid] === needle) { return true; }

    return bs_list(haystack, needle, low, mid) || bs_list(haystack, needle, mid + 1, high);
}
