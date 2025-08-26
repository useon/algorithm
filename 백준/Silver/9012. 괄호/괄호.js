const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input[0]);
const brackets = input.slice(1);
const result = [];

for(let bracket of brackets) {
    const stack = [];
    let isIncorrect = false;
    for(let target of bracket) {
        if(target === '(') {
            stack.push('('); // 일단 여는 괄호는 넣어준다.
        } else { // 닫는 괄호인 경우
            if(stack[stack.length - 1] === '(') {
                stack.pop(); // stack의 마지막이 '('인 경우 stack에서 삭제
            } else {
                isIncorrect = true; // 아닌 경우는 올바른 괄호열이 아님
                break;
            }
        }
    }
    if(stack.length) isIncorrect = true; // 끝까지 돌았는데도 stack이 비지 않으면 올바른 괄호열 X
    result.push(isIncorrect ? 'NO' : 'YES');
}

console.log(result.join('\n'));
