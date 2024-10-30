// Check if any nodes in the distances array have not been visited yet
function hasUnvisited(seen: boolean[], distances: number[]): boolean {
    return seen.some((s, i) => !s && distances[i] < Infinity);
}

// scan the "seen" and "distances" array to find the "lowest" distance node that has not been visited yet
function getLowestUnvisited(seen: boolean[], distances: number[]): number {
    let idx = -1;
    let lowestDistance = Infinity;

    for (let i=0; i<seen.length; ++i) {
        if (seen[i]) { continue; }

        if (lowestDistance > distances[i]) {
            lowestDistance = distances[i];
            idx = i;
        }
    }

    return idx;
}

export default function dijkstra_list(source: number, sink: number, arr: WeightedAdjacencyList): number[] {
    const seen = new Array(arr.length).fill(false);
    const distances = new Array(arr.length).fill(Infinity);
    const prev = new Array(arr.length).fill(-1);

    // mark your source distance as 0
    distances[source] = 0;

    while (hasUnvisited(seen, distances)) {
        const curr = getLowestUnvisited(seen, distances);
        seen[curr] = true;

        // get the adjacency list for the current node
        const buds = arr[curr];
        // loop over the adjacent nodes and update the distance to the node
        for (let i=0; i<buds.length; ++i) {
            const edge = buds[i];
            if (seen[edge.to]) { continue; }

            // calculate new distance by adding current node distance + distance to new node 
            const dist = distances[curr] + edge.weight;
            // if new distance is less than the distance to the new node, log it in the distance array for the new node
            if (dist < distances[edge.to]) {
                distances[edge.to] = dist;
                prev[edge.to] = curr;
            }
        }
    }

    const out: number[] = [];
    let curr = sink;

    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    out.push(source);
    return out.reverse();
}