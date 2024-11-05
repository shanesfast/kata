export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const prev: number[] = new Array(graph.length).fill(-1);

    // mark starting vertex as seen
    seen[source] = true;

    // create a "queue" to track vertices in the do-while loop
    // make sure to queue the "source" vertex to get it started
    const q = [source];

    do {
        const vert = q.shift() as number;

        // if we found our needle, stop looping
        if (vert === needle) { break; }

        // queue the adjacent vertices so they can be searched
        const neighbors = graph[vert];
        for (let i=0; i<neighbors.length; ++i) {
            // if there is no connection to this vertex "i" then continue to the next vertex "i"
            if (neighbors[i] === 0) { continue; }

            // if we have seen this vertex before, do not check it again
            if (seen[i]) { continue; }

            // mark vertex as seen
            seen[i] = true;
            prev[i] = vert;
            q.push(i);
        }

    } while (q.length);

    // Build the path to the needle
    let curr: number = needle; // needle is the first value in our path since it is the value we are seeking
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
