export default function dijkstra_list(source: number, sink: number, arr: WeightedAdjacencyList): number[] {
    const prev = new Array(arr.length).fill(-1);
    const seen = new Array(arr.length).fill(false);
    const distances = new Array(arr.length).fill(Infinity);

    // check if any nodes in the distances array have not been visited yet
    const hasUnvisited = (): boolean => {
        return seen.some((v, i) => !v && distances[i] < Infinity);
    }

    const getLowestUnseen = (): number => {
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

    // mark source as 0 for distance from source to source
    distances[source] = 0;

    while (hasUnvisited()) {
        const curr = getLowestUnseen();
        seen[curr] = true;

        const adjList = arr[curr];

        // loop over adjacent nodes and update distance for each one
        for (let i=0; i<adjList.length; ++i) {
            const edge = adjList[i];
            if (seen[edge.to]) { continue; }

            // calc new distance
            const dist = distances[curr] + edge.weight;

            if (dist < distances[edge.to]) {
                distances[edge.to] = dist;
                // since we have found a shorter distance from one node to another,
                // mark the "to" nodes previous node as the current node
                // this allows us to build out "shortest path" array later
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
