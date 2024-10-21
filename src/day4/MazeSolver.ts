const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
];

function walk(maze: string[], wall: string, curr: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
    // out of bounds
    if (
        curr.x < 0 || curr.x >= maze[0].length ||
        curr.y < 0 || curr.y >= maze.length
    ) {
        return false;
    }

    // hit a wall
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    // seen before
    if (seen[curr.y][curr.x]) { return false; }

    // reached the end
    if (curr.x === end.x && curr.y === end.y) { 
        path.push({ x: curr.x, y: curr.y });
        return true; 
    }

    // mark as seen before
    seen[curr.y][curr.x] = true;

    // explore all directions around current point
    for (let i=0; i<dir.length; ++i) {
        const [x, y] = dir[i];
        if (walk(maze, wall, { x: curr.x + x, y: curr.y + y }, end, seen, path)) {
            path.push(curr);
            return true;
        }
    }

    // not a valid point in the path to the end
    return false;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    const path: Point[] = [];
    const seen: boolean[][] = [];

    // populate the "seen" array with default values of false
    for (let i=0; i<maze.length; ++i) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    // walk the maze
    walk(maze, wall, start, end, seen, path);

    return path;
}