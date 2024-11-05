export default function bs_list(haystack: number[], needle: number, low: number = 0, high: number = haystack.length): boolean {
    // not found case
    if (low > high) { return false; }

    // start in the middle of the partition, determine if value is greater or less than needle
    let mid = Math.floor(low + (high - low) / 2);

    // found case
    if (haystack[mid] === needle) { return true; }

    // look to the right if mid value is lower than needle
    if (haystack[mid] < needle) { low = mid + 1; }
    // look to left if mid value is higher than needle
    else { high = mid - 1; }

    // console.log(`low = ${low}; high = ${high};`);
    // recurse
    return bs_list(haystack, needle, low, high);
}
