export default function two_crystal_balls(breaks: boolean[]): number {
    // jump sqrt(length) until first ball breaks
    const jump = Math.sqrt(breaks.length);
    let i = 0;

    for (; i<breaks.length; i += jump) {
        if (breaks[i]) { break; }
    }

    // walk back 1 sqrt(length)
    i -= jump;

    // linear search for first break point with remaining ball
    for (let k=i; k<breaks.length; ++k) {
        if (breaks[k]) { return k; }
    }

    return -1;
}
