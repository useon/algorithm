const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const info = input.slice(1).map((x) => x.split(' '));

for (let i = 0; i < N * 3; i += 3) {
    const testcase = info.slice(i, i + 3);
    console.log(bfs(testcase));
}

function cloneBoard(board) {
    return board.map(r => [...r]);
}

function serialize(board) {
    return board.flat().join('');
}

function isAllSame(board) {
    const f = board.flat();
    return f.every(v => v === 'T') || f.every(v => v === 'H');
}

function bfs(start) {
    const queue = [];
    const visited = new Set();

    queue.push({ board: start, dist: 0 });
    visited.add(serialize(start));

    while (queue.length) {
        const { board, dist } = queue.shift();

        if (isAllSame(board)) return dist;

        const nextBoards = generateNextBoards(board);

        for (const nb of nextBoards) {
            const key = serialize(nb);
            if (!visited.has(key)) {
                visited.add(key);
                queue.push({ board: nb, dist: dist + 1 });
            }
        }
    }

    return -1;
}

function generateNextBoards(board) {
    const results = [];

    for (let i = 0; i < 3; i++) {
        const b = cloneBoard(board);
        for (let j = 0; j < 3; j++) {
            b[i][j] = b[i][j] === 'T' ? 'H' : 'T';
        }
        results.push(b);
    }

    for (let j = 0; j < 3; j++) {
        const b = cloneBoard(board);
        for (let i = 0; i < 3; i++) {
            b[i][j] = b[i][j] === 'T' ? 'H' : 'T';
        }
        results.push(b);
    }

    {
        const b = cloneBoard(board);
        for (let i = 0; i < 3; i++) {
            b[i][i] = b[i][i] === 'T' ? 'H' : 'T';
        }
        results.push(b);
    }

    {
        const b = cloneBoard(board);
        for (let i = 0; i < 3; i++) {
            const y = i;
            const x = 2 - i;
            b[y][x] = b[y][x] === 'T' ? 'H' : 'T';
        }
        results.push(b);
    }

    return results;
}
