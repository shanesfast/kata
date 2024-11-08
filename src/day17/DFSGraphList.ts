function doDFS(graph: WeightedAdjacencyList, curr: number, needle: number, path: number[], seen: boolean[]): boolean {
    if (curr === needle) { 
        path.push(curr);
        return true; 
    }
    if (seen[curr]) { return false; }

    seen[curr] = true;
    path.push(curr);

    // check edges 
    const edges = graph[curr];
    for (let i=0; i<edges.length; ++i) {
        const edge = edges[i];

        if (edge.weight !== 0 && doDFS(graph, edge.to, needle, path, seen)) {
            return true;
        }
    }

    path.pop();
    return false;
}

export default function dfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] | null {
    // essentially the "mazesolver" problem
    const seen: boolean[] = new Array(graph.length).fill(false);
    const path: number[] = [];

    doDFS(graph, source, needle, path, seen);
    return path.length ? path : null;
}
