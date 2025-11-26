const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
const n = Number(input[0])

function fib(n) {
    const dp = Array(n + 1).fill(0)
    dp[1] = 1
    
    for (let i = 2; i <= n; i++) {
        dp[i] = BigInt(dp[i - 1]) + BigInt(dp[i - 2])    
    }

  return dp[n];
}

console.log(fib(n).toString());
