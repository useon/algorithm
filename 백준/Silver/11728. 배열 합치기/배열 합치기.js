const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const A = input[1].split(' ').map(Number);
const B = input[2].split(' ').map(Number);

let i = 0;
let j = 0;
const result = [];

while (i < N && j < M) {
  if (A[i] <= B[j]) {
    result.push(A[i]);
    i++;
  } else {
    result.push(B[j]);
    j++;
  }
}

while (i < N) {
  result.push(A[i]);
  i++;
}

while (j < M) {
  result.push(B[j]);
  j++;
}

console.log(result.join(' '));
