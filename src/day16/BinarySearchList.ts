export default function bs_list(haystack: number[], needle: number, low: number = 0, high: number = haystack.length): boolean {
    if (low >= high) { return false; }

    let mid = Math.floor(low + ((high  - low) / 2));

    if (haystack[mid] === needle) { return true; }

    if (haystack[mid] < needle) { low = mid + 1; }
    else { high = mid; }

    return bs_list(haystack, needle, low, high); 
}
