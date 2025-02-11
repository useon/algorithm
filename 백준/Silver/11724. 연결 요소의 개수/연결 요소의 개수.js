const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const nodes = input.slice(1).map((x) => x.split(' ').map(Number));

// 그래프 초기화
const graph = Array.from({ length: n + 1 }, () => []);

// 왜 각각 u도 v도 다 넣어줘야 하는가? 무방향이라서 1에서 2 연결이면, 2에서도 1연결 경로 존재.
nodes.forEach(([u, v]) => {
  graph[u].push(v);
  graph[v].push(u);
});

// 방문 여부를 체크할 배열
const visited = Array(n + 1).fill(false);

function bfs(start) {
  const queue = [start];
  visited[start] = true;

  while (queue.length > 0) {
    const cur = queue.shift();

    graph[cur].forEach((next) => {
      if (!visited[next]) {
        visited[next] = true;
        queue.push(next);
      }
    });
  }
}

let connectedLine = 0;
for (let i = 1; i <= n; i++) {
  if (!visited[i]) {
    bfs(i);
    connectedLine += 1;
  }
}

console.log(connectedLine);