const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const str = input[0].split('');
const m = Number(input[1]);
const commands = input.slice(2, 2 + m);
// cursor를 기준으로
// 왼쪽 스택
let leftStack = str;
// 오른쪽 스택 -> 거꾸로 쌓는다.
let rightStack = [];

for(let i = 0; i < m; i++) {
    const [command, add] = commands[i].split(' ');

    if(leftStack.length !== 0 && command === 'L') {
        const target = leftStack.pop();
        rightStack.push(target);
    }

    if(rightStack.length !== 0  && command === 'D') {
        const target = rightStack.pop();
        leftStack.push(target);
    }

    if(leftStack.length !== 0 && command === 'B') {
        leftStack.pop();
    }

    if(command === 'P') {
        leftStack.push(add);
    }
}

console.log(leftStack.join('') + rightStack.reverse().join(''))
