const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, X] = input[0].split(' ').map(Number);
const visitors = input[1].split(' ').map(Number);

// 일정 구간에 대한 합을 구하기
let windowSum = 0;
for (let i = 0; i < X; i++) {
  windowSum += visitors[i];
}

let maxSum = windowSum;
let count = 1;

// 한 칸씩 오른쪽으로 이동
for (let i = X; i < N; i++) {
  windowSum += visitors[i];        
  windowSum -= visitors[i - X];    

  if (windowSum > maxSum) {
    maxSum = windowSum;
    count = 1;
  } else if (windowSum === maxSum) {
    count++;
  }
}

if (maxSum === 0) {
  console.log('SAD');
} else {
  console.log(maxSum);
  console.log(count);
}
