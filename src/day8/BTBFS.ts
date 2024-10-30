export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const q: BinaryNode<number>[] = [head]; // pretend this is a queue... it's not really

    while (q.length) {
        const node = q.shift();
        
        if (node?.value === needle) { return true; }

        if (node?.left) { q.push(node.left); }
        if (node?.right) { q.push(node.right); }
    }

    return false;
}
