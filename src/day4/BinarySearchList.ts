function bsearch(haystack: number[], needle: number, low: number, high: number): boolean {
    let mid = Math.floor(low + (high - low) / 2);
    let val = haystack[mid];
    
    if (val === needle) { return true; }
    if (low >= high) { console.log('low greater than high'); return false; }

    if (val < needle) { low = mid + 1; }
    else { high = mid; }

    return bsearch(haystack, needle, low, high);
}

export default function bs_list(haystack: number[], needle: number): boolean {
    return bsearch(haystack, needle, 0, haystack.length);
}
