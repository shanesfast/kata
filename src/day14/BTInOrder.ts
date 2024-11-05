export default function in_order_search(head: BinaryNode<number> | undefined | null, path: number[] = []): number[] {
    if (!head) { return path; }

    // go left
    in_order_search(head.left, path);
    
    // add to path
    path.push(head.value);

    // go right
    in_order_search(head.right, path);

    return path;
}