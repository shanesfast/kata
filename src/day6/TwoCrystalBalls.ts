export default function two_crystal_balls(breaks: boolean[]): number {
    // walk forward sqrt(length) until 1st ball breaks
    const jump = Math.sqrt(breaks.length);
    let i = 0;

    for (; i<breaks.length; i += jump) {
        if (breaks[i]) { break; }
    }

    // walk back 1 sqrt
    i -= jump;

    // linear search for the first break point with the last ball
    for (let k=i; k<breaks.length; ++k) {
        if (breaks[k]) { return k; }
    }

    return -1;
}