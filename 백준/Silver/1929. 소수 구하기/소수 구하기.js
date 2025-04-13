const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split(' ').map((x) => +x);
let isPrime = false;

for (let i = input[0]; i <= input[1]; i++) {
  for (let j = 2; j <= Math.floor(Math.sqrt(i)); j++) {
    if (i % j === 0) {
      isPrime = true;
      break;
    }
  }
  if (isPrime === false && i !== 1) {
    console.log(i);
  }
  isPrime = false;
}