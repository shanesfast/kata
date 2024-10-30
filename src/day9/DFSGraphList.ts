function walk(graph: WeightedAdjacencyList, curr: number, needle: number, seen: boolean[], path: number[]) {
    // seen before
    if (seen[curr]) { return false; }

    // found our needle!
    if (curr === needle) {
        path.push(curr);
        return true;
    }

    // mark as seen and add to solution path
    seen[curr] = true;
    path.push(curr);

    // check adjacent vertices
    const edges = graph[curr];
    for (let i=0; i<edges.length; ++i) {
        const edge = edges[i];
        if (edge.weight > 0) {
            if (walk(graph, edge.to, needle, seen, path)) {
                return true;
            }
        }
    }

    // not part of solution path
    path.pop();
    return false;
}

export default function dfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const path: number[] = [];

    walk(graph, source, needle, seen, path);

    return path.length ? path : null;
}