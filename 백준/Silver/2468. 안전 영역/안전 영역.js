const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../input.txt';
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim().split('\n');
const N = Number(input[0]);
const info = input.slice(1).map((x) => x.split(' ').map(Number));
// 조건에 맞게 bfs를 여러번 돌려야 한다.
let maxCount = 0;

for(let h = 0; h <= 100; h++) {
    const visited = Array.from({length: N}, () => Array(N).fill(false));
    let safeZoneCount = 0;
    
    for(let i = 0; i < N; i++) {
        for(let j = 0; j < N; j++) {
            // 방문하지 않았고 잠기지 않았으면
            if(!visited[i][j] && info[i][j] > h) {
                bfs(i, j, h, visited); // 인접 다 방문 처리
                safeZoneCount += 1;
            }
        }
    }
    maxCount = Math.max(maxCount, safeZoneCount);
}

function bfs(x, y, h, visited) {
    const queue = [[x, y]];
    visited[x][y] = true;
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    while(queue.length > 0) {
        const [curX, curY] = queue.shift();
        
        for(let i = 0; i < 4; i++) {
            const nextX = curX + dx[i];
            const nextY = curY + dy[i];
            
            if(nextX >= 0 && nextX < N && nextY >= 0 && nextY < N && !visited[nextX][nextY] && info[nextX][nextY] > h) {
                queue.push([nextX, nextY]);
                visited[nextX][nextY] = true;
            }
        }
    }
}

console.log(maxCount);
