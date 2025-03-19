const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input[0]);
const graph = input.slice(1, 1+N).map((x) => x.split(' ').map(Number));

// 누적합

const prefixSum = Array.from({length: N + 1}, () => Array(N + 1).fill(0));

for(let i = 1; i <= N; i++) {
    for(let j = 1; j <= N; j++) {
        prefixSum[i][j] = graph[i - 1][j - 1] +
                          prefixSum[i - 1][j] +
                          prefixSum[i][j - 1] -
                          prefixSum[i - 1][j - 1]; 
    }
}

// 구간합
let maxSum = -Infinity;

for (let k = 1; k <= N; k++) { 
    for (let i = 1; i <= N - k + 1; i++) { 
        for (let j = 1; j <= N - k + 1; j++) { 
            const sum = prefixSum[i + k - 1][j + k - 1]
                      - prefixSum[i - 1][j + k - 1]
                      - prefixSum[i + k - 1][j - 1]
                      + prefixSum[i - 1][j - 1];

            maxSum = Math.max(maxSum, sum);
        }
    }
}

console.log(maxSum);