const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
];

function walk(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    path: Point[],
    seen: boolean[][]
): boolean {
    // out of bounds case
    if (curr.x < 0 || curr.x > maze[0].length - 1 ||
        curr.y < 0 || curr.y > maze.length - 1
    ) {
        return false;
    }

    // hitting a wall case
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    // seen before case
    if (seen[curr.y][curr.x]) {
        return false;
    }

    // found the end case
    if (curr.x === end.x && curr.y === end.y) {
        path.push({ x: curr.x, y: curr.y });
        return true;
    }


    /* 3 steps for recursion */
    // 1: pre-recursion
    // Mark the current point as "seen" so we don't check it infinitely
    seen[curr.y][curr.x] = true;

    // 2: recursion
    // Call walk() for each direction from the current point
    for (let i=0; i<dir.length; ++i) {
        const [x, y] = dir[i];

        if (walk(maze, wall, { x: x + curr.x, y: y + curr.y }, end, path, seen)) {
            path.push(curr); // Current point is a valid part of the path to the end point
            return true;
        }
    }

    // 3: post-recursion
    // Current point was not a valid part of the path
    return false;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    const seen: boolean[][] = [];
    const path: Point[] = [];

    // init empty "seen" array to track which points have already been visited
    // crucial for preventing infinite recursion
    for (let i=0; i<maze.length; ++i) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    // walk the maze
    walk(maze, wall, start, end, path, seen);

    return path;
}