const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim();

function removeParentheses(expression) {
    const stack = [];
    const pairs = []; // 괄호 쌍 저장
    const results = new Set();

    // 괄호 쌍 찾기
    for (let i = 0; i < expression.length; i++) {
        if (expression[i] === '(') stack.push(i);
        else if (expression[i] === ')') pairs.push([stack.pop(), i]);
    }

    // DFS로 모든 괄호 제거 조합 생성
    function dfs(idx, toRemove) {
        if (idx === pairs.length) {
            let temp = '';
            for (let i = 0; i < expression.length; i++) {
                if (!toRemove.has(i)) temp += expression[i];
            }
            if (temp !== expression) results.add(temp); // 원본 제외
            return;
        }

        const [open, close] = pairs[idx];

        // 1) 현재 괄호 제거
        const newSet = new Set(toRemove);
        newSet.add(open);
        newSet.add(close);
        dfs(idx + 1, newSet);

        // 2) 현재 괄호 유지
        dfs(idx + 1, toRemove);
    }

    dfs(0, new Set());

    // 결과 정렬 후 출력
    return [...results].sort();
}

const answer = removeParentheses(input);
console.log(answer.join('\n'));
