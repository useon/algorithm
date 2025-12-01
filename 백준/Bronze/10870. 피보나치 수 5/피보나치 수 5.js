const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
const n = Number(input[0])

function solve(num) {
    if(num === 0) return 0
    if(num === 1) return 1
    return solve(num - 2) + solve(num - 1);
}

console.log(solve(n))
