export default function dfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] {
    const path: number[] = [];
    const seen: boolean[] = new Array(graph.length).fill(false);

    go(graph, source, needle, path, seen);

    return path;
}

function go(graph: WeightedAdjacencyList, curr: number, needle: number, path: number[], seen: boolean[]): boolean {
    if (curr === needle) { 
        path.push(curr);
        return true; 
    }
    
    if (seen[curr]) { return false; }

    seen[curr] = true;
    path.push(curr);

    const edges = graph[curr];

    for (let i=0; i<edges.length; ++i) {
        const e = edges[i];

        if (e.weight > 0 && !seen[e.to] && go(graph, e.to, needle, path, seen)) {
            return true;
        }
    }

    path.pop();
    return false;
}
