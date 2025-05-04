const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim();
const N = Number(input);

let count = 0;
for (let i = 5; i <= N; i *= 5) {
  count += Math.floor(N / i);
}

console.log(count);
