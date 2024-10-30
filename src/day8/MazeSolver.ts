const dir = [
    [-1,0],[0,-1],[1,0],[0,1]
];

function walk(maze: string[], wall: string, curr: Point, end: Point, path: Point[], seen: boolean[][]) {
    // out of bounds
    if (curr.x < 0 || curr.x >= maze[0].length ||
        curr.y < 0 || curr.y >= maze.length
    ) {
        return false;
    }

    // hit a wall
    if (maze[curr.y][curr.x] === wall) { return false; }

    // found the end
    if (curr.x === end.x && curr.y === end.y) { 
        path.push(curr);
        return true;
    }

    // seen before
    if (seen[curr.y][curr.x]) { return false; }

    // mark as seen
    seen[curr.y][curr.x] = true;

    // explore directions around current
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
    const path: Point[] = [];
    const seen: boolean[][] = [];

    for (let k=0; k<maze.length; ++k) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, wall, start, end, path, seen);

    return path;
}