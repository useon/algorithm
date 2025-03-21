const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
// 조합 문제
const visited = Array(N + 1).fill(false);
const result = [];
backtrack(1, 0);

function backtrack(start, depth) {
    if(depth === M) {
        console.log(result.join(' '));
    }

    for(let i = start; i <= N; i++) {
        if(!visited[i]) {
            visited[i] = true;
            result.push(i);
            backtrack(i + 1, depth + 1);
            visited[i] = false;
            result.pop();
        }
    }
}
