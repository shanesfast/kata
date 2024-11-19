function doDfs(graph: WeightedAdjacencyList, curr: number, needle: number, seen: boolean[], path: number[]): boolean {
    if (curr === needle) { 
        path.push(curr);
        return true; 
    }

    seen[curr] = true;

    // explore neighbor nodes
    const edges = graph[curr];
    for (const edge of edges) {
        path.push(curr);
        // 0 means no connection to node from current node
        // don't process nodes already visited
        if (edge.weight !== 0 && !seen[edge.to] && doDfs(graph, edge.to, needle, seen, path)) {
            return true;
        }

        path.pop();
    }

    return false;
}

export default function dfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const path: number[] = [];

    doDfs(graph, source, needle, seen, path);

    // if (path.length) {
    //     path.push(needle);
    // }

    return path;
}