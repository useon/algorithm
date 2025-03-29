const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const T = Number(input[0]);
const info = input.slice(1).map(Number);

const results = [];
const maxN = Math.max(...info);

const dp = Array(maxN + 1).fill(0);
dp[0] = 1;
dp[1] = 1;
dp[2] = 2;
dp[3] = 4;

for (let i = 4; i <= maxN; i++) {
  dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
}

for (let i = 0; i < T; i++) {
  const target = info[i];
  console.log(dp[target]);
}
