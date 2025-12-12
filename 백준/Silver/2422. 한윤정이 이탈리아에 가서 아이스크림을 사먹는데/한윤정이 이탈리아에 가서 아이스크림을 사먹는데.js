const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const bad = Array.from({ length: N + 1 }, () => new Array(N + 1));

for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  bad[a][b] = 1;
  bad[b][a] = 1;
}

let result = 0;

for (let i = 1; i <= N - 2; i++) {
  for (let j = i + 1; j <= N - 1; j++) {
    if (bad[i][j]) continue;

    for (let k = j + 1; k <= N; k++) {
      if (bad[i][k] || bad[j][k]) continue;
      result++;
    }
  }
}

console.log(result);
