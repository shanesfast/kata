function go(graph: WeightedAdjacencyList, curr: number, needle: number, seen: boolean[], path: number[]): boolean {
    if (curr === needle) { 
        path.push(curr);
        return true; 
    }

    seen[curr] = true;
    path.push(curr);

    const edges = graph[curr];
    for (let i=0; i<edges.length; ++i) {
        const e = edges[i];

        if (e.weight !== 0 && !seen[e.to] && go(graph, e.to, needle, seen, path)) {
            return true;
        }
    }

    path.pop();
    return false;
}

export default function dfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const path: number[] = [];

    go(graph, source, needle, seen, path);

    return path;
}