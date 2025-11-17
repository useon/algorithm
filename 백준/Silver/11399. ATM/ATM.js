const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
const n = Number(input[0])
const info = input[1].split(' ').sort((a, b) => Number(a) - Number(b))

let prev = 0
let sum = 0

for(let i = 0; i < n; i++) {
    sum += prev + Number(info[i])
    prev += Number(info[i])
}

console.log(sum)
