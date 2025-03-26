const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input[0]);
const info = input.slice(1).map(Number);
const stack = [];
const result = [];
let current = 1;
let possible = true;

for(let i = 0; i < info.length; i++) {
    const target = info[i];
    while(current <= target) {
        stack.push(current);
        result.push('+');
        current++;
    }

    const popped = stack.pop();
    if(popped !== target) {
        possible = false;
        break;
    }
    result.push('-');
}

console.log(possible ? result.join('\n') : 'NO')