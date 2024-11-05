export default function pre_order_search(head: BinaryNode<number> | undefined | null, path: number[] = []): number[] {
    if (!head) { return path; }

    // add to path
    path.push(head.value);

    // go left
    pre_order_search(head.left, path);

    // go right
    pre_order_search(head.right, path);

    return path;
}