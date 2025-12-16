const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const info = input.map((x) => x.split(' ').map(Number));

function solve() {
    for(let i = 0; i < 19; i++) {
        for(let j = 0; j < 19; j++) {
            if(info[i][j] !== 0) {
                if(isBingo(i, j)) return [i, j]
            }
        }
    }
    return [0]
}

function isBingo(startRow, startCol) {
    const dol = info[startRow][startCol];
    if (dol === 0) return false;

    const dirs = [
        [0, 1],
        [1, 0],
        [1, 1],
        [-1, 1],
    ];

    const inRange = (r, c) => r >= 0 && r < 19 && c >= 0 && c < 19;

    for (const [dr, dc] of dirs) {
        const prevR = startRow - dr;
        const prevC = startCol - dc;

        if (inRange(prevR, prevC) && info[prevR][prevC] === dol) continue;

        let count = 0;
        let r = startRow;
        let c = startCol;

        while (inRange(r, c) && info[r][c] === dol) {
            count++;
            r += dr;
            c += dc;
        }

        if (count === 5) {
            if (!inRange(r, c) || info[r][c] !== dol) {
                return true;
            }
        }
    }

    return false;
}

const result = solve()

if(result.length === 2) {
    const [row, col] = result
    console.log(info[row][col])
    console.log(row + 1, col + 1)
} else {
    console.log(0)
}
