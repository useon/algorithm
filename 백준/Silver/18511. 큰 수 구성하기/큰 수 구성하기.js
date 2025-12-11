const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const digits = input[1].split(' ').map(Number);

digits.sort((a, b) => b - a);

let answer = 0;

function dfs(cur) {
  if (cur > N) return;

  if (cur > answer) {
    answer = cur;
  }

  for (const d of digits) {
    const next = cur * 10 + d;
    dfs(next);
  }
}

dfs(0);

console.log(answer);
