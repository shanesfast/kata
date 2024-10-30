export default function compare(a: BinaryNode<number> | null | undefined, b: BinaryNode<number> | null | undefined): boolean {
    // if both nodes are null, then we have a match!
    if (!a && !b) { return true; }

    // if values do not match... not a match!
    if (a?.value !== b?.value) { return false; }

    // check left and right sides!
    return compare(a?.left, b?.left) && compare(a?.right, b?.right);
}