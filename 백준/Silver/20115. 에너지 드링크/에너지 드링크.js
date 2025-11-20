const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
const info = input[1].split(' ').map(Number).sort((a, b) => b - a)
const maxNum = info[0]
const shakeNum = info.slice(1).reduce((a, b) => a + b) / 2
console.log(maxNum + shakeNum)
