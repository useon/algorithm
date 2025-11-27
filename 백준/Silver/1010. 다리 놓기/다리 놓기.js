const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function solve() {
  const T = Number(input[0]);
  const MAX = 30;

  const dp = Array.from({ length: MAX + 1 }, () =>
    Array(MAX + 1).fill(0),
  );

  for (let n = 0; n <= MAX; n++) {
    for (let k = 0; k <= n; k++) {
      if (k === 0 || k === n) {
        dp[n][k] = 1; 
      } else {
        dp[n][k] = dp[n - 1][k - 1] + dp[n - 1][k];
      }
    }
  }

  const result = [];

  for (let i = 1; i <= T; i++) {
    const [N, M] = input[i].split(' ').map(Number);
    result.push(String(dp[M][N]));
  }

  console.log(result.join('\n'));
}

solve();
