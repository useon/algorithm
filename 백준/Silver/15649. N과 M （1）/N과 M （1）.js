const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
// 1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열
const visited = Array(N + 1).fill(false);
const result = [];
backtrack(0);

function backtrack(depth) {
    if(depth === M) {
        console.log(result.join(' '));
        return;
    }

    for(let i = 1; i <= N; i++) {
        if(!visited[i]) {
            visited[i] = true;
            result.push(i);
            backtrack(depth + 1);
            visited[i] = false;
            result.pop();
        }
    }
}