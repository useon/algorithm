const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const board = input[0].split('.')

function solve() {
    for(let i = 0; i < board.length; i++) {
        const size = board[i].length
        let str = ''
        if(size % 2 !== 0) return -1

        const aCount = Math.floor(size / 4)
        const bCount = Math.floor(size % 4)
        for(let j = 0; j < aCount * 4; j++) {
            str += 'A'
        }

        for(let k = 0; k < bCount; k++) {
            str += 'B'
        }
        board[i] = str
    }
    return board.join('.')
}

console.log(solve())
