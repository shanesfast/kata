export default function pre_order_search(head: BinaryNode<number> | null | undefined, path: number[] = []): number[] {
    if (!head) { return path; }

    path.push(head.value);

    // left
    pre_order_search(head.left, path);
    // right
    pre_order_search(head.right, path);

    return path;
}