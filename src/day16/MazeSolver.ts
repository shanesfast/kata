const dir = [
    [-1,0], [0,-1], [1,0], [0,1]
];

function walk(maze: string[], wall: string, curr: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
    // out of bounds
    if (curr.x < 0 || curr.x >= maze[0].length ||
        curr.y < 0 || curr.y >= maze.length
    ) {
        return false;
    }

    // found the end
    if (curr.x === end.x && curr.y === end.y) {
        path.push(curr);
        return true;
    }

    // seen before
    if (seen[curr.y][curr.x]) { 
        return false;
    }

    // hit a wall
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    // mark as seen
    seen[curr.y][curr.x] = true;

    // explore dir around curr
    for (let i=0; i<dir.length; ++i) {
        const [x, y] = dir[i];

        if (walk(maze, wall, { x: curr.x + x, y: curr.y + y }, end, seen, path)) {
            path.push(curr);
            return true;
        }
    }

    return false;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    const seen: boolean[][] = new Array(maze.length);
    const path: Point[] = [];

    // fill seen array with defaults
    for (let i=0; i<maze.length; ++i) {
        seen[i] = new Array(maze[0].length).fill(false);
    }

    walk(maze, wall, start, end, seen, path);

    return path;
}
