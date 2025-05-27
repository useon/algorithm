const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input[0]);
const tops = input[1].split(' ').map(Number);
const answer = Array(N).fill(0);
const stack = []; 

for(let i = 0; i < N; i++) {
    const now = tops[i];
    // 스택이 비지 않고, 현재 탑이 스택의 top보다 크면 계속 pop
    while(stack.length > 0 && tops[stack[stack.length - 1]] < now) {
        stack.pop();
    }

    // 스택이 비지 않았다면 수신한 탑의 인덱스가 존재
    if(stack.length > 0) {
        answer[i] = stack[stack.length - 1] + 1;
    }

    // 현재 탑을 스택에 push
    stack.push(i);
}

console.log(answer.join(' '));
