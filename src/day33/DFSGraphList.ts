export default function dfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] {
    const path: number[] = [];
    const seen: boolean[] = new Array(graph.length).fill(false);

    go(graph, source, needle, seen, path);

    return path;
}

function go(graph: WeightedAdjacencyList, curr: number, needle: number, seen: boolean[], path: number[]): boolean {
    if (curr === needle) { 
        path.push(curr);
        return true; 
    }

    seen[curr] = true;
    path.push(curr);

    const edges = graph[curr];

    for (let i=0; i<edges.length; ++i) {
        const edge = edges[i];

        if (edge.weight !== 0 && !seen[edge.to] && go(graph, edge.to, needle, seen, path)) {
            return true;
        }
    }

    path.pop();
    return false;
}