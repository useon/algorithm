const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [W, H] = input[0].split(' ').map(Number);
// 외벽을 조사할 때 여유를 두지 않으면 누락할 수 있기 때문이다.  
const info = [Array(W + 2).fill(0)];
for (let i = 1; i <= H; i++) {
  info.push([0, ...input[i].split(' ').map(Number), 0]);
}
info.push(Array(W + 2).fill(0)); 

const visited = Array.from({ length: H + 2 }, () => Array(W + 2).fill(false));

// 짝수 줄 기준
const evenDx = [1, 0, -1, -1, -1, 0];
const evenDy = [0, -1, 0, 1, -1, 1];

// 홀수 줄 기준
const oddDx = [1, 1, 0, -1, 0, 1];
const oddDy = [0, -1, -1, 0, 1, 1];

function bfs() {
  const queue = [[0, 0]];
  visited[0][0] = true;
  let wallCount = 0;

  while (queue.length > 0) {
    const [y, x] = queue.shift();
    const dx = y % 2 === 0 ? evenDx : oddDx;
    const dy = y % 2 === 0 ? evenDy : oddDy;

    for (let i = 0; i < 6; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (ny < 0 || ny >= H + 2 || nx < 0 || nx >= W + 2) continue;

      if (info[ny][nx] === 1) {
        wallCount++;
      } else if (!visited[ny][nx] && info[ny][nx] === 0) {
        visited[ny][nx] = true;
        queue.push([ny, nx]);
      }
    }
  }

  return wallCount;
}

console.log(bfs());
