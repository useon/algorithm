const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim();
const n = Number(input);
const dp = Array(n + 1).fill(0);

dp[1] = 1;
dp[2] = 2;

for(let i = 3; i <= n; i++) {
    dp[i] = (dp[i - 2] + dp[i - 1]) % 10007;
}

console.log(dp[n]);
