export default function post_order_search(head: BinaryNode<number> | null | undefined, path: number[] = []): number[] {
    if (!head) { return path; }

    // left
    post_order_search(head.left, path);

    // right
    post_order_search(head.right, path);

    path.push(head.value);

    return path;
}