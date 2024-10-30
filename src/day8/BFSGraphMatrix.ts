/** 
 * NOTE: Nodes are just numbers here (plain values)
    The relationship between them is represented by the adjacency matrix 
    The y axis represents the current node
    The x axis represents the other nodes in the graph

    So if you are at node 3, your y axis is 3.
    The x axis is a list of other nodes on the graph for node 3.
    If the value for node3Adjacency[i] is not 0, then there is a connection between current node 3 and node i.
***/
export default function bfs(
    graph: WeightedAdjacencyMatrix, 
    source: number, 
    needle: number
): number[] | null {
    // Keep a list of visited nodes so that we do not walk the graph for eternity
    const seen = new Array(graph.length).fill(false);
    // Keep a list of previously visited nodes - this will be the output of this function
    const prev = new Array(graph.length).fill(-1);

    // Set the first or "source" node as seen
    seen[source] = true;
    // create a "queue" (not really a queue) for the remaining nodes in the graph
    const q: number[] = [source];

    do {
        // pop from the "queue"
        const curr = q.shift() as number;

        // check if we have found our value
        // if so, end the loop and return the path array "prev"
        if (curr === needle) {
            break;
        }

        // grab the adjacency list for the current node
        const adjs = graph[curr];

        // adjacency list and graph list will have the same length
        // since the matrix is graph.length X graph.length
        for (let i=0; i<graph.length; ++i) {
            if (adjs[i] === 0) {
                continue;
            }

            if (seen[i]) {
                continue;
            }

            seen[i] = true;
            prev[i] = curr;
            q.push(i); // i represents the position of the node in the adjacency matrix
        }

    } while (q.length);

    // build it backwards
    // construct the path taken to reach the "needle"
    let curr = needle; // this would be the last value in our path, so start there and work backwards
    const out: number[] = [];

    while (prev[curr] !== -1) { // loop until you reach a node that was not visited ( node === -1 )
        out.push(curr); // if the node was visited, add it to the path array "out"
        curr = prev[curr]; // set current to the next "previous" node in the "prev" array
    }

    if (out.length) {
        // make sure to add the source (starting node) to the path array "out"
        return [source].concat(out.reverse());
    }

    return null; // if the needle was not found
}
