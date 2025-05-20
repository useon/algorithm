const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input[0]);
const info = input.slice(1).map((x) => x.split(' ').map(Number));
const graph = Array.from({length: N + 1}, () => []);
const parents = Array(N + 1).fill(0);

// 연결된 노드를 그래프로 만들기
for(let i = 0; i < N - 1; i++) {
    const [a, b] = info[i];
    graph[a].push(b);
    graph[b].push(a);
}

const queue = [1];
parents[1] = -1; // 루트는 부모 없음 표시

while (queue.length) {
  const node = queue.shift();

  for (const next of graph[node]) {
    if (parents[next] === 0) { // 방문 안 했으면
      parents[next] = node;    // 부모 기록
      queue.push(next);
    }
  }
}

// 2번부터 출력
for (let i = 2; i <= N; i++) {
  console.log(parents[i]);
}
