const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const t = Number(input[0])
const info = input.slice(1)

for(let i = 0; i < t; i++) {
    const patten = /^[ABCDEF]?A+F+C+[ABCDEF]?$/
    if(patten.test(info[i])) {
        console.log('Infected!')
    } else {
        console.log('Good')
    }
}
