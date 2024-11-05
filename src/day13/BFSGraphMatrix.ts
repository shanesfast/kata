export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const prev: number[] = new Array(graph.length).fill(-1);

    // mark source as seen
    seen[source] = true;

    // use array as a queue for simplicity - real linked list queue would be more efficient
    // make sure to queue up the starting node
    const q: number[] = [source];

    do {
        // pull from queue
        const curr = q.shift() as number;

        // check if it is our target value
        if (curr === needle) { break; }

        // check neighbors
        const neighbors = graph[curr];
        for (let i=0; i<neighbors.length; ++i) {
            // 0 represents no connection to the neighbor from current
            if (neighbors[i] === 0) { continue; }

            // have we seen it before?
            if (seen[i]) { continue; }

            // mark as seen
            seen[i] = true;
            // set curr as previous node in prev array
            prev[i] = curr;
            // queue it up
            q.push(i);
        }
    } while (q.length);

    // build out the path to the needle (if we could find the needle)
    let curr: number = needle;
    const out: number[] = [];

    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    if (out.length) {
        out.push(source);
        return out.reverse();
    }

    return null;
}