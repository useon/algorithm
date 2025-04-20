const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input[0]);
const orders = input.slice(1);

const stack = [];
const result = [];

for(let i = 0; i < N; i++) {
    const [order, X] = orders[i].split(' ').map(Number);
    if(order === 1) {
        stack.push(X);
    } else if(order === 2) {
        result.push(stack.length ? stack.pop() : -1);
    } else if(order === 3) {
        result.push(stack.length);
    } else if(order === 4) {
        result.push(stack.length === 0 ? 1 : 0);
    } else if(order === 5) {
        result.push(stack.length ? stack[stack.length - 1] : -1);
    }
}

console.log(result.join('\n'));
