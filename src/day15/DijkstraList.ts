export default function dijkstra_list(source: number, sink: number, arr: WeightedAdjacencyList): number[] {
    const prev = new Array(arr.length).fill(-1);
    const seen = new Array(arr.length).fill(false);
    const distance = new Array(arr.length).fill(Infinity);

    // set source distance to 0
    distance[source] = 0;

    function hasUnvisited(): boolean {
        for (let i=0; i<seen.length; ++i) {
            // check that the current i has been part of an edge to a previously visited node (if distance[i] is less than Infinity)
            // this ensures that we do not visit nodes that are not connected to our source node
            if (!seen[i] && distance[i] < Infinity) {
                return true;
            }
        }

        return false;
    }

    function getLowestUnseen(): number {
        let idx = -1;
        let lowest = Infinity;

        for (let i=0; i<seen.length; ++i) {
            if (seen[i]) { continue; }

            if (lowest > distance[i]) {
                lowest = distance[i];
                idx = i;
            }
        }

        return idx;
    }

    while (hasUnvisited()) {
        let curr = getLowestUnseen();
        seen[curr] = true;

        for (let edge of arr[curr]) {
            if (seen[edge.to]) { continue; }

            const dist = distance[curr] + edge.weight;

            if (dist < distance[edge.to]) {
                prev[edge.to] = curr;
                distance[edge.to] = dist;
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
