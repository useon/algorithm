const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input[0]);
const graph = input.slice(1).map((x) => x.split(' ').map(Number));

function findPath(graph) {
  const graphLength = graph.length;
  const result = Array.from({ length: graphLength }, () =>
    Array(graphLength).fill(0),
  );

  function bfs(start) {
    const queue = [start];
    const visited = Array(graphLength).fill(false);

    while (queue.length > 0) {
      const cur = queue.shift();
      for (let next = 0; next < graphLength; next++) {
        if (graph[cur][next] === 1 && !visited[next]) {
          visited[next] = true;
          result[start][next] = 1;
          queue.push(next);
        }
      }
    }
  }

  for (let i = 0; i < N; i++) {
    bfs(i);
  }

  for (let node of result) {
    console.log(node.join(' '));
  }
}

findPath(graph);
