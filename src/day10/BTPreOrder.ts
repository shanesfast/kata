export default function pre_order_search(head: BinaryNode<number> | null, list: number[] = []): number[] {
    if (!head) { return list; }

    // add to list before queueing children
    list.push(head.value);

    // queue left
    pre_order_search(head.left, list);
    // queue right
    pre_order_search(head.right, list);

    return list;
}