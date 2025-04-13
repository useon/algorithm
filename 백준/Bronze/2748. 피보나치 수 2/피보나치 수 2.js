const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input);

const fib = (n) => {
  const dp = Array(n + 1).fill(0);
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = BigInt(dp[i - 1]) + BigInt(dp[i - 2]);
  }

  return dp[n];
};

console.log(fib(N).toString());