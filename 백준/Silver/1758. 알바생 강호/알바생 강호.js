const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = Number(input[0])
const info = input.slice(1).map(Number).sort((a, b) => b - a)
let count = 0

for(let i = 0; i < n; i++) {
    const tip = info[i] - i
    if(tip <= 0) break
    count += tip
}

console.log(count)
