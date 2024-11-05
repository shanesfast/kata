export default function post_order_search(head: BinaryNode<number> | undefined | null, path: number[] = []): number[] {
    if (!head) { return path; }

    // go left
    post_order_search(head.left, path);
    
    // go right
    post_order_search(head.right, path);
    
    // add to path
    path.push(head.value);

    return path;
}