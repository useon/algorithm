const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim();

const stack = [];
let count = 0;

for(let i = 0; i < input.length; i++) {    
    if(input[i] === '(') {
        stack.push('(');
    } else {
        stack.pop();

        // 레이저
        if(input[i - 1] === '(') {
            count += stack.length;
        } else {
            count += 1;
        }
    }

}

console.log(count);
