const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input[0]);
const info = input[1].split(' ').map(Number);

// 누적합
const prefixSum = Array(N);
// 누적합의 첫번째는 자기자신
prefixSum[0] = info[0];

for(let i = 1; i < N; i++) {
    prefixSum[i] = prefixSum[i - 1] + info[i];
}

// 구간합 
let sum = 0;
for(let j = 1; j < N; j++) {
    sum += info[j] * prefixSum[j - 1];
}
console.log(sum);
