export default function two_crystal_balls(breaks: boolean[]): number {
    // walk ahead sqrt(breaks.length) until 1 of the balls break
    const jump = Math.sqrt(breaks.length);
    let i = 0;

    for (; i<breaks.length; i += jump) {
        if (breaks[i]) { break; }
    }

    // walk back 1 sqrt
    i -= jump;

    // linear search for the first break point using the remaining ball
    for (let j=i; j<breaks.length; ++j) {
        if (breaks[j]) { return j; }
    }

    return -1;
}