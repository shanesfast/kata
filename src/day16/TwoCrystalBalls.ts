export default function two_crystal_balls(breaks: boolean[]): number {
    // jump sqrt(len) until first ball breaks
    let jump = Math.sqrt(breaks.length);
    let i = 0;

    for (; i<breaks.length; i += jump) {
        if (breaks[i]) { break; }
    }

    // move back one sqrt(len)
    i -= jump;

    // linear search for first break point, return it's index
    for (; i<breaks.length; ++i) {
        if (breaks[i]) { return i; }
    }

    return -1;
}
