const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim();
const N = Number(input);
const dp = Array(N + 1).fill(0);

dp[1] = 1;
dp[2] = 3;
dp[3] = 5;

for(let i = 4; i <= N; i++) {
    dp[i] = (dp[i - 1] + 2 * dp[i - 2]) % 10007;
}

console.log(dp[N])
