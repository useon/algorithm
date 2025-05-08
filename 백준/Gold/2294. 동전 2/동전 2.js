const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
// n개의 줄, 합이 k원
const [n, k] = input[0].split(' ').map(Number);
const coins = input.slice(1).map(Number);
const dp = Array(k + 1).fill(Infinity);
// 0은항상 만들 수 있는 금액
dp[0] = 0;

for(const coin of coins) {
    // 계속 dp[i]를 갱신해야 해서 dp[i]도 비교
    for(let i = coin; i <= k; i++) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
}

console.log(dp[k] === Infinity ? -1 : dp[k]);
