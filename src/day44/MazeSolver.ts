const dir = [
    [-1,0], [1,0], [0,-1],[0,1]
];

function walk(maze: string[], wall: string, curr: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
    if (curr.x < 0 || curr.x >= maze[0].length ||
        curr.y < 0 || curr.y >= maze.length) {
        return false;
    }
    
    if (curr.x === end.x && curr.y === end.y) {
        path.push(curr);
        return true;
    }

    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    if (seen[curr.y][curr.x]) {
        return false;
    }

    seen[curr.y][curr.x] = true;

    for (let i=0; i<dir.length; ++i) {
        const [x, y] = dir[i];

        if (walk(maze, wall, {x: x + curr.x, y: y + curr.y }, end, seen, path)) {
            path.push(curr);
            return true;
        }
    }

    return false;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    const seen: boolean[][] = [];
    const path: Point[] = [];

    for (let i=0; i<maze.length; ++i) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, wall, start, end, seen, path);

    return path;
}