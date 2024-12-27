export default function pre_order_search(head: BinaryNode<number> | null, path: number[] = []): number[] {
    if (!head) { return path; }

    path.push(head.value);
    pre_order_search(head.left, path);
    pre_order_search(head.right, path);

    return path;
}