export default function bs_list(haystack: number[], needle: number): boolean {
    let low = 0;
    let high = haystack.length;

    while (low < high) {
        let mid = Math.floor(low + (high - low) / 2);
        let midVal = haystack[mid];

        if (midVal === needle) { return true; }
        else if (midVal < needle) { low = mid + 1; }
        else { high = mid; }
    }

    return false;
}
