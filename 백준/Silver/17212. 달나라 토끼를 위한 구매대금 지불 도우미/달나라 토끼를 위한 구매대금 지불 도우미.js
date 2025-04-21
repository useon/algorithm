const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim();
const N = Number(input);
const dp = Array(N + 1).fill(0);
dp[0] = 0;
dp[1] = 1;
dp[2] = 1;
dp[3] = 2;
dp[4] = 2;
dp[5] = 1;
dp[6] = 2;
dp[7] = 1;

for(let i = 8; i <= N; i++) {
    dp[i] = Math.min(dp[i - 1], dp[i - 2], dp[i - 5], dp[i - 7]) + 1;
}

console.log(dp[N]);
