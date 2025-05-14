const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../input.txt';
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim().split('\n');
// 육지L, 바다W
// 이동: 상, 하, 좌, 우
// 보물: 서로 간에 최단 거리로 이동하는데
// 가장 긴 시간이 걸리는 육지 두 곳에 묻혀있

// 한 지점에서 다른 지점으로 가는데
// 가장 dist가 큰 것을  구하자.
// row, col
// 육지: L, 바다: W
const [row, col] = input[0].split(' ').map(Number);
const graph = input.slice(1).map((x) => x.split(''));
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
let maxCount = 0;
let candidateA = [];
let candidateB = [];


const visited = Array.from({length: row}, () => Array(col).fill(false));
for(let i = 0; i < row; i++) {
    for(let j = 0; j < col; j++) {
        if(!visited[i][j] && graph[i][j] === 'L') {
            const [dist, positions] = bfs(i, j, visited);
            if(dist > maxCount) {
                candidateA = [i, j];
                candidateB = positions;
                maxCount = dist;
            }
        }
    }
}

console.log(maxCount);

function bfs(i, j, visited) {
    // i와 j에서 시작해서 갈 수 있는 모든 지점
    // 을 방문해서 가장 긴 시간이 걸리는 지점 도출
    const queue = [[i, j, 0]];
    const finished = Array.from({length: row}, () => Array(col).fill(false));
    finished[i][j] = true;
    let count = 0;
    let candidateArr = [];

    while(queue.length > 0) {
        const [curRow, curCol, curDist] = queue.shift();
        if(curDist > count) {
            count = curDist;
            candidateArr = [curRow, curCol];
        }  
        for(let i = 0; i < 4; i++) {
            const nextRow = curRow + dx[i];
            const nextCol = curCol + dy[i];

                    if(nextRow >= 0 && nextRow < row && nextCol >= 0 && nextCol < col && !visited[nextRow][nextCol] && !finished[nextRow][nextCol] && graph[nextRow][nextCol] === 'L') {
                        queue.push([nextRow, nextCol, curDist + 1]);
                        finished[nextRow][nextCol] = true;
                    }
        }
    }
    return [count, candidateArr, count];
}
