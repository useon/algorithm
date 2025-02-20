const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, k] = input[0].split(' ').map((Number));
const arr = input[1].split(' ').map((Number))

// 누적합을 구하자 ~
const prefixSum = Array.from({ length: n + 1 }).fill(0);
for(let i = 1; i <= n; i++) {
    prefixSum[i] = arr[i - 1] + prefixSum[i - 1];
}
// console.log(prefixSum)

// 구간합을 구하자 ~ 
let counts = []; 

for(let a = 1; a + k <= n + 1; a++) {
    const sum = prefixSum[a + k - 1] - prefixSum[a - 1];
    counts.push(sum);
}

// console.log(counts)
console.log(counts.sort((a, b) => b - a)[0])