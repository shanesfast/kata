export default function two_crystal_balls(breaks: boolean[]): number {
    let jump = Math.sqrt(breaks.length);
    let i = 0;

    for (; i<breaks.length; i += jump) {
        if (breaks[i]) { break; }
    }

    i -= jump;

    for (let k=0; k<breaks.length; ++k) {
        if (breaks[k]) { return k; }
    }

    return -1;
}
