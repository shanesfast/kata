const dir = [
    [-1,0],[0,-1],[1,0],[0,1]
];

function walk(maze: string[], wall: string, curr: Point, end: Point, path: Point[], seen: boolean[][]): boolean {
    // out of bounds
    if (curr.x < 0 || curr.x >= maze[0].length ||
        curr.y < 0 || curr.y >= maze[0].length
    ) {
        return false;
    }

    // hit a will
    if (maze[curr.y][curr.x] === wall) { return false; }

    // found the end - be sure to add the end Point to the "path" array
    if (curr.x === end.x && curr.y === end.y) {
        path.push(curr);
        return true;
    }

    // seen before
    if (seen[curr.y][curr.x]) { return false; }

    // add current point to "seen" array
    seen[curr.y][curr.x] = true;

    // explore directions around current point
    for (let i=0; i<dir.length; ++i) {
        const [x, y] = dir[i];

        if (walk(maze, wall, { x: curr.x + x, y: curr.y + y }, end, path, seen)) {
            path.push(curr);
            return true;
        }
    }

    return false;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    // setup "path" and "seen" arrays for storing the answer and already visited nodes
    const path: Point[] = [];
    const seen: boolean[][] = [];
    
    // fill "seen" array with default "false" values
    for (let i=0; i<maze.length; ++i) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    // walk the maze
    walk(maze, wall, start, end, path, seen);

    return path;
}