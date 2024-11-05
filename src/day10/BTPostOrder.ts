export default function post_order_search(head: BinaryNode<number> | null, list: number[] = []): number[] {
    if (!head) { return list; }

    // stack left
    post_order_search(head.left, list);
    // stack right
    post_order_search(head.right, list);
    // push value to list
    list.push(head.value);

    return list;
}