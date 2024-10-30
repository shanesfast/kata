function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
    // base case: current node is undefined
    if (!curr) { return path; }

    
    // left side
    walk(curr.left, path);

    // track current node
    path.push(curr.value);

    // right side
    walk(curr.right, path);

    return path;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}