const dir = [
    [1,0], [-1,0], [0,-1], [0,1]
];

function walk(maze: string[], wall: string, curr: Point, end: Point, path: Point[], seen: boolean[][]) {
    // out of bounds
    if (curr.x < 0 || curr.x >= maze[0].length ||
        curr.y < 0 || curr.y >= maze.length
    ) {
        return false;
    }

    // hit a wall
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    // found the end
    if (curr.x === end.x && curr.y === end.y) { 
        path.push(curr);
        return true; 
    }

    // seen current point before
    if (seen[curr.y][curr.x]) { return false; }

    // mark current point as seen
    seen[curr.y][curr.x] = true;

    // explore the 4 directions around the current point
    for (let i=0; i<dir.length; ++i) {
        const [x, y] = dir[i];
        if (walk(maze, wall, { x: curr.x + x, y: curr.y + y }, end, path, seen)) {
            path.push(curr);
            return true;
        }
    }

    // current point is not part of the path solution
    return false;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    const path: Point[] = [];
    const seen: boolean[][] = [];

    // fill the seen array with default "false" values
    // each coordinate in the "seen" array will be marked as true when it is visited
    for (let i=0; i<maze.length; ++i) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    // "walk" the maze
    walk(maze, wall, start, end, path, seen);

    return path;
}