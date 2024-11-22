function doDFS(graph: WeightedAdjacencyList, curr: number, needle: number, seen: boolean[], path: number[]): boolean {
    if (curr === needle) { 
        path.push(curr); 
        return true; 
    }

    if (seen[curr]) { return false; }
    seen[curr] = true;

    path.push(curr);

    const edges = graph[curr];
    for (let i=0; i<edges.length; ++i) {
        const edge = edges[i];

        if (edge.weight !== 0 && !seen[edge.to] && doDFS(graph, edge.to, needle, seen, path)) {
            return true;
        }
    }

    path.pop();
    return false;
}

export default function dfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] {
    const path: number[] = [];
    const seen: boolean[] = new Array(graph.length).fill(false);

    doDFS(graph, source, needle, seen, path);

    return path;
}