const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = Number(input[0])

function solve() {
    let count = Infinity
    const fiveMax = Math.floor(n / 5)
    for(let i = fiveMax; i >= 0; i--) {
        const remain = n - (5 * i)
        if(remain % 2 !== 0) continue
        const twoMax = Math.floor(remain / 2)
        count = Math.min(count, i + twoMax)
    }
    if(count === Infinity) return -1
    return count
}

console.log(solve())
