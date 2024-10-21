export default function two_crystal_balls(breaks: boolean[]): number {
    // advance sqrt(length) until 1st ball breaks
    const jump = Math.sqrt(breaks.length);
    let i = jump;

    for (; i<breaks.length; i+=jump) {
        if (breaks[i]) { break; }
    }

    // go back 1 sqrt(length)
    i -= jump;

    // linear search for 1 break point with remaining ball
    // return the index of 1st break point
    for (let k=i; k<breaks.length; ++k) {
        if (breaks[k]) { return k; }
    }

    return -1;
}