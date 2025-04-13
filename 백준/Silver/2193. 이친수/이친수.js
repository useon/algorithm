const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input);
const dp = new Array(N + 1).fill(0);

dp[1] = 1; 
dp[2] = 1;

for (let i = 3; i <= N; i++) {
  dp[i] = BigInt(dp[i - 1]) + BigInt(dp[i - 2]);
}

console.log(dp[N].toString());
