const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n').map(Number);
const T = input[0];
const info = input.slice(1);
const dp = Array(T + 1).fill(0);
dp[0] = [1, 0];
dp[1] = [0, 1];
dp[2] = [dp[1][0] + dp[0][0], dp[1][1] + dp[0][1]]

for(let i = 3; i <= 40; i++) {
    dp[i] = [dp[i - 1][0] + dp[i - 2][0], dp[i - 1][1] + dp[i - 2][1]];
}

for(let j = 0; j < T; j++) {
    console.log(dp[info[j]].join(' '));
}
