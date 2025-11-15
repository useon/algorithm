const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, k] = input[0].split(' ').map(Number)
const info = input.slice(1).map(Number)

function solve() {
    let count = 0
    let money = k
    for(let i = n; i >= 0; i--) {
        if(money >= info[i]) {
            count += Math.floor(money / info[i])
            money = money % info[i]
        }
        if(money === 0) return count
    }
}

console.log(solve())
