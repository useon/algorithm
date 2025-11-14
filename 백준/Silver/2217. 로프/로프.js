const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input[0])
const info = input.slice(1).sort((a, b) => Number(b) - Number(a))

function solve() {
    let maxWeight = 0
    for(let i = 0; i < N; i++) {
        const weight = info[i] * (i + 1)
        maxWeight = Math.max(maxWeight, weight)
    }
    return maxWeight
}

console.log(solve())
    