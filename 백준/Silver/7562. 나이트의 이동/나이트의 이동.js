const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../input.txt';
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim().split('\n');
const T = Number(input[0]);
const info = input.slice(1);

for(let i = 0; i < 3 * T; i = i + 3) {
    const I = Number(info[i]);
    const [startRow, startCol] = info[i + 1].split(' ').map(Number);
    const [endRow, endCol] = info[i + 2].split(' ').map(Number);
    console.log(bfs(I, startRow, startCol, endRow, endCol));
}



function bfs(I, startRow, startCol, endRow, endCol) {
    const visited = Array.from({ length: I }, () => Array(I).fill(false));
    const dRow = [-2, -2, -1, -1, 1, 1, 2, 2];
    const dCol = [-1, 1, -2, 2, -2, 2, -1, 1];

    const queue = [[startRow, startCol, 0]];
    visited[startRow][startCol];

    while(queue.length > 0) {
        const [curRow, curCol, curDist] = queue.shift();

        if(curRow === endRow && curCol === endCol) return curDist;
        
        for(let i = 0; i < 8; i++) {
            const nextRow = curRow + dRow[i];
            const nextCol = curCol + dCol[i];
            
            if(nextRow >= 0 && nextRow < I && nextCol >= 0 && nextCol < I && !visited[nextRow][nextCol]) {
                queue.push([nextRow, nextCol, curDist + 1]);
                visited[nextRow][nextCol] = true;
            }
        }
    }
}
