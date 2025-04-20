const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n').map(Number);
const K = input[0];
const info = input.slice(1);
const result = [];

for(let i = 0; i < K; i++) {
    const N = info[i];

    if(N === 0) {
        result.pop();
    } else {
        result.push(N);
    }
}

console.log(result.length > 0 ? result.reduce((x, y) => x + y) : 0);
