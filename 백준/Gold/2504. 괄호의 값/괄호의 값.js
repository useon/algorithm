const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim();
const info = input.split('');

function solution(info) {
    const stack = [];

    for(let char of info) {
        // 여는 괄호인 경우 stack에 바로 넣어준다.
        if(char === '(' || char === '[') {
            stack.push(char)
        } else if(char === ')' || char ===']') {
            // 닫는 괄호인 경우는 아래와 같은 과정을 거친다.
    
            // top이 number인 경우가 있기 때문에 그 경우 곱하기 위해(문제의 조건)
            let sum = 0
            // stack이 비어있지 않는 경우까지 반복
            while(stack.length)  {
                const top = stack.pop();
    
                // 각 쌍끼리 매칭해준다.
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
            // 닫는 괄호일 때 이제 더이상 stack이 없다는 의미는 옳바른 괄호열이 아니다
            if(stack.length === 0 && (char === ')' || char === ']')) return 0;
        }
    }

    // 이제 stack 안에 있는 숫자들을 모두 더해주기
    let result = 0;
    for(let value of stack) {
        // 괄호가 남아 있다면 올바른 괄호열이 아니다.
        if(typeof value !== "number") return 0;
        result += value;
    }
    return result;
}

console.log(solution(info));
