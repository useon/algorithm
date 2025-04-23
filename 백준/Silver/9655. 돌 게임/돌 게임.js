const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim();
// 돌 N개
// 돌 1개 또는 3개 가져갈 수 있다.
// 마지막 돌을 가져가는 사람이 승
const N = Number(input);
// 상근이가 먼저 시작함
// 1 또 는 3을 가져갈 수 있는데 이기는 사람 어떻게 판단해?
// 어차피 N이 홀수이면 시작하는 사람이 마지막 - 상근
// 짝수이면 다른 사람이 마지막. - 창영
console.log(N % 2 === 0 ? 'CY' : 'SK');
