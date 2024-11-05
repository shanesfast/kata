export default function two_crystal_balls(breaks: boolean[]): number {
    // walk forward sqrt(length) until first ball breaks
    let jump = Math.sqrt(breaks.length);
    let i = 0;

    for (; i<breaks.length; i += jump) {
        if (breaks[i]) { break; }
    }

    // walk back 1 sqrt(length)
    i -= jump;

    // linear search for first break point with remaining ball
    for (let k=0; k<breaks.length; ++k) {
        // return index of first break point
        if (breaks[k]) { return k; }
    }

    return -1;
}