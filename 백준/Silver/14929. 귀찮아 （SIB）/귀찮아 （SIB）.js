const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input[0]);
const X = input[1].split(' ').map(Number);
const prefixSum = new Array(X.length);
prefixSum[0] = X[0]; // 첫 번째 요소의 누적합은 자기 자신이다

// 누적합 만들기
for(let i = 1; i < X.length; i++) {
    prefixSum[i] = prefixSum[i - 1] + X[i];
}

// 구간합 구하기
// 하나하나 구하려고 하면 시간초과의 가능성이 있음
// 따라서 (전체 합의 제곱 - 각 원소 제곱의 합) / 2
// O(N)으로 계산할 수 있음
let sum = 0;
let sumSquares = 0;

for(let num of X) {
    sum += num;
    sumSquares += num * num;
}

const result = (sum * sum - sumSquares) / 2;
console.log(result);
