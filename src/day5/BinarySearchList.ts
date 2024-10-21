function bs(haystack: number[], needle: number, low: number, high: number): boolean {
    if (low > high) { return false; }

    let mid = Math.floor(low + (high - low) / 2);
    let val = haystack[mid];

    if (val === needle) { return true; }

    if (val < needle) { low = mid + 1; }
    else { high = mid; }

    return bs(haystack, needle, low, high);
}

export default function bs_list(haystack: number[], needle: number): boolean {
    return bs(haystack, needle, 0, haystack.length);
}