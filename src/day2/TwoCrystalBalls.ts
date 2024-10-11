export default function two_crystal_balls(breaks: boolean[]): number {
    // walk sqrt ahead until you find a break
    let jump = Math.floor(Math.sqrt(breaks.length));
    let i = jump;

    for (; i<breaks.length; i+=jump) {
        if (breaks[i]) { break; }
    }

    // walk back 1 sqrt
    i -= jump;

    // linear search for the first break, return the position
    for (; i<breaks.length; ++i) {
        if (breaks[i]) { return i;}
    }

    return -1;
}