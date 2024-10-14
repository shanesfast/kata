export default function two_crystal_balls(breaks: boolean[]): number {
    let jump = Math.floor(Math.sqrt(breaks.length));

    // jump until first ball breaks
    let i = jump;
    for (; i<breaks.length; i += jump) {
        if (breaks[i]) { break; }
    }

    // walk back 1 sqrt(length)
    i -= jump;

    // linear search for first break with remaining ball, return that index
    for (let j=i; j<breaks.length; ++j) {
        if (breaks[j]) { return j; }
    }

    return -1;
}