const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map((Number));
const arr = input.slice(1, n + 1).map((x) => x.split(' ').map((Number)));
const k = Number(input[n+1])
const points = input.slice(n+2).map((x) => x.split(' ').map((Number)));

for(let a = 0; a < k; a++) {
    let count = 0;
    const [i, j, x, y] = points[a];
    
    for(let b = i - 1; b < x; b++) {
        for(let c = j - 1; c < y; c++) {
            count += arr[b][c];
        }
    }
    console.log(count);
    count = 0;
}