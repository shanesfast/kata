export default function post_order_search(head: BinaryNode<number> | null, path: number[] = []): number[] {
    if (!head) { return path; }

    post_order_search(head?.left, path);
    post_order_search(head?.right, path);
    path.push(head.value);

    return path;
}