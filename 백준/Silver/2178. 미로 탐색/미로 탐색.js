const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
// 한 칸에서 다른 칸으로 이동할 때, 서로 인접한 칸으로만 이동가능 -> 상하좌우

const [N, M] = input[0].split(' ').map(Number);
const graph = input.splice(1).map((x) => x.split('').map(Number));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

function bfs(x, y) {
  const queue = [];
  // 시작 지점
  queue.push([x, y]);

  while (queue.length > 0) {
    // 현재 탐색할 지점
    const [curX, curY] = queue.shift();

    // 상하좌우
    for (let i = 0; i < 4; i++) {
      const nextX = curX + dx[i];
      const nextY = curY + dy[i];

      // 범위 및 이동 가능 확인
      if (
        nextX >= 0 &&
        nextX < N &&
        nextY >= 0 &&
        nextY < M &&
        graph[nextX][nextY] === 1
      ) {
        queue.push([nextX, nextY]);
        graph[nextX][nextY] = graph[curX][curY] + 1;
      }
    }
  }
}

bfs(0, 0);
console.log(graph[N - 1][M - 1]);