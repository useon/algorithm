const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
// 중복이 가능한 순열
const result = [];
const output = [];
backtrack(0);
console.log(output.join('\n'))

function backtrack(depth) {
    if(depth === M) {
        output.push(result.join(' '));
        return;
    }

    for(let i = 1; i <= N; i++) {
        result.push(i);
        backtrack(depth + 1);
        result.pop();
    }
}
