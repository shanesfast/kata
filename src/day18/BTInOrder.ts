export default function in_order_search(head: BinaryNode<number> | null | undefined, path: number[] = []): number[] {
    if (!head) { return path; }

    // left
    in_order_search(head.left, path);

    path.push(head.value);

    // right
    in_order_search(head.right, path);

    return path;
}