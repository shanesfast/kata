export default function dfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] {
    const path: number[] = [];
    const seen: boolean[] = new Array(graph.length).fill(false);

    goDeep(graph, source, needle, path, seen);

    return path;
}

function goDeep(graph: WeightedAdjacencyList, curr: number, needle: number, path: number[], seen: boolean[]): boolean {
    if (curr === needle) { 
        path.push(curr);
        return true;
    }

    seen[curr] = true;
    const edges = graph[curr];
    path.push(curr);

    for (let i=0; i<edges.length; ++i) {
        const edge = edges[i];

        if (edge.weight > 0 && !seen[edge.to] && goDeep(graph, edge.to, needle, path, seen)) {
            return true;
        }
    }

    path.pop();
    return false;
}
