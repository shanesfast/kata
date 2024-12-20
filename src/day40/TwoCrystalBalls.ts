export default function two_crystal_balls(breaks: boolean[]): number {
    const jump = Math.sqrt(breaks.length);
    let idx = 0;

    for (; idx<breaks.length; idx += jump) {
        if (breaks[idx]) { break; }
    }

    idx -= jump;

    for (; idx<breaks.length; ++idx) {
        if (breaks[idx]) { return idx; }
    }

    return -1;
}