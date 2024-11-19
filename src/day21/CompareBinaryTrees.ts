export default function compare(a: BinaryNode<number> | null | undefined, b: BinaryNode<number> | null | undefined): boolean {
    if (a?.value !== b?.value) { return false; }
    if (!a && !b) { return true; }

    return compare(a?.left, b?.left) && compare(a?.right, b?.right);
}
