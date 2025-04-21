const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim();
const N = Number(input);
const dp = Array(N + 1).fill(Infinity);
dp[3] = 1;
dp[4] = -1;
dp[5] = 1;
dp[6] = 2;
dp[7] = -1;
dp[8] = 2;
dp[9] = 3;

for(let i = 10; i <= N; i++) {
    if(dp[i - 3] === -1 && dp[i - 5] !== -1) {
        dp[i] = dp[i - 5] + 1;
    } else if(dp[i - 5] === -1 && dp[i - 3] !== -1) {
        dp[i] = dp[i - 3] + 1;
    } else if(dp[i - 3] === -1 && dp[i - 5] === -1) {
        dp[i] = -1;
    } else if(dp[i - 3] !== -1 && dp[i - 5] !== -1) {
        dp[i] = Math.min(dp[i - 3], dp[i - 5]) + 1;
    }
}

console.log(dp[N]);
