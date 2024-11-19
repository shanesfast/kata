export default function dfs(head: BinaryNode<number> | null, needle: number): boolean {
    if (head?.value === needle) { return true; }
    if (!head) { return false; }

    return dfs(head.left, needle) || dfs(head.right, needle);
}
