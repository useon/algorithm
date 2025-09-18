const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('');
let result = 0;

function solution(info) {
    const stack = [];
    for(let char of info) {
        if(char === '(' || char === '[') {
                stack.push(char);
        } else {
            let sum = 0;
            while(stack.length)  {
                const top = stack.pop();
                if(top === '(' && char === ')') {
                    stack.push(sum === 0 ? 2 : 2 * sum);
                    break;
                } else if(top === '[' && char === ']') {
                    stack.push(sum === 0 ? 3 : 3 * sum);
                    break;
                } else if(typeof top === 'number') {
                    sum += top;
                } else {
                    return 0;
                }
            }
            if(stack.length === 0) return 0;
        }
    }
    for(let num of stack) {
        if(typeof num !== 'number') return 0;
        result += num;
    }
    return result;
}

console.log(solution(input));
