import MinHeap from '../day33/MinHeap';

export default function dijkstra_list(source: number, sink: number, arr: WeightedAdjacencyList): number[] {
    const heap = new MinHeap();
    const distances: number[] = new Array(arr.length).fill(Infinity);
    const prev: number[] = new Array(arr.length).fill(-1);

    distances[source] = 0;
    heap.insert(source);

    while (heap.length) {
        const curr = heap.delete() as number;
        const edges = arr[curr];

        for (let i=0; i<edges.length; ++i) {
            const edge = edges[i];
            const newDist = distances[curr] + edge.weight;

            if (edge.weight > 0 && newDist < distances[edge.to]) {
                prev[edge.to] = curr;
                distances[edge.to] = newDist;
                heap.insert(edge.to);
            }
        }
    }

    const out: number[] = [];
    let curr = sink;

    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    if (out.length) {
        out.push(source);
    }

    return out.reverse();
}