import MinHeap from './MinHeap.js';

export default function dijkstra_list(source: number, sink: number, arr: WeightedAdjacencyList): number[] {
    const priorityQ = new MinHeap<number>();
    const distances = new Array(arr.length).fill(Infinity);
    const prev = new Array(arr.length).fill(-1);

    // mark your source distance as 0
    distances[source] = 0;
    // queue up the source node
    priorityQ.insert(source);

    while (priorityQ.length) {
        const curr = priorityQ.delete();
        if (!curr) { break; } // make compiler happy

        // loop over the adjacent nodes and update the distance to the node
        const buds = arr[curr];
        for (let i=0; i<buds.length; ++i) {
            const edge = buds[i];

            // queue up the "to" node
            priorityQ.insert(edge.to);

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