export default function two_crystal_balls(breaks: boolean[]): number {
    let jump = Math.sqrt(breaks.length);
    let i = 0;

    // jump sqrt(length) until first ball breaks
    for (; i<breaks.length; i += jump) {
        if (breaks[i]) { break; }
    }

    // walk back 1 sqrt
    i -= jump;

    // linear search for first break point, return index
    for (let k=i; k<breaks.length; ++k) {
        if (breaks[k]) { return k; }
    }

    return -1;
}