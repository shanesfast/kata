function walk(graph: WeightedAdjacencyList, curr: number, needle: number, seen: boolean[], path: number[]): boolean {
    if (seen[curr]) { return false; }
    if (curr === needle) { 
        path.push(curr);
        return true; 
    }

    // mark as seen
    seen[curr] = true;
    path.push(curr);

    // check neighbors
    const neighbors = graph[curr];
    for (let i=0; i<neighbors.length; ++i) {
        // 0 represents no connection between current and this neighbor
        if (neighbors[i].weight === 0) { continue; }
        if (walk(graph, neighbors[i].to, needle, seen, path)) {
            return true;
        }
    }

    path.pop();
    return false;
}

export default function dfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const path: number[] = [];

    walk(graph, source, needle, seen, path);

    return path.length ? path : null;
}
