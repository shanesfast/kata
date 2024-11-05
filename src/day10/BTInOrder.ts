export default function in_order_search(head: BinaryNode<number> | null, list: number[] = []): number[] {
    if (!head) { return list; }

    // queue left
    in_order_search(head.left, list);
    // push value to list
    list.push(head.value);
    // queue right
    in_order_search(head.right, list);

    return list;
}