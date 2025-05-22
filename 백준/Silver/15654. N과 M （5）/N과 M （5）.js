const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
// N개의 자연수 중에서 M개를 고른 수열 사전순으로
const [N, M] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number).sort((a, b) => a - b);

// 중복 방지를 위해 visited 배열
const visited = Array(N).fill(false);
const path = [];

backtrack(0);

function backtrack(depth) {
    if(depth === M) {
        console.log(path.join(' '));
        return;
    }

    for(let i = 0; i < N; i++) {
        if(!visited[i]) {
            visited[i] = true;
            path.push(numbers[i]);

            backtrack(depth + 1);

            // 되돌리기
            visited[i] = false;
            path.pop();
        }
    }
}
