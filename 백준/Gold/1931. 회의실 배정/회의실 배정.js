const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const meetings = [];

for (let i = 1; i <= N; i++) {
  const [s, e] = input[i].split(' ').map(Number);
  meetings.push([s, e]);
}

meetings.sort((a, b) => {
  if (a[1] === b[1]) return a[0] - b[0];
  return a[1] - b[1];
});

let count = 0;
let lastEnd = 0; 

for (let i = 0; i < N; i++) {
  const [start, end] = meetings[i];
  if (start >= lastEnd) {
    count++;
    lastEnd = end;
  }
}

console.log(count);
