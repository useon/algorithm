const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n').map(Number);
const N = input[0];
const score = [0, ...input.slice(1)];
const dp = Array(N + 1).fill(0);

dp[1] = score[1];
dp[2] = score[1] + score[2];
dp[3] = Math.max(score[2], score[1]) + score[3];

for (let i = 4; i <= N; i++) {
  dp[i] = Math.max(
    dp[i - 2] + score[i],
    dp[i - 3] + score[i - 1] + score[i]
  );
}

console.log(dp[N]);
