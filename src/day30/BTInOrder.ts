export default function in_order_search(head: BinaryNode<number> | null, path: number[] = []): number[] {
    if (!head) { return path; }

    in_order_search(head.left, path);
    path.push(head.value);
    in_order_search(head.right, path);

    return path;
}
