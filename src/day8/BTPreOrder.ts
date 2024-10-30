function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
    // base case: current node is undefined
    if (!curr) { return path; }

    // pre
    path.push(curr.value);

    // left side
    walk(curr.left, path);
    // right side
    walk(curr.right, path);

    // post
    return path;
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}