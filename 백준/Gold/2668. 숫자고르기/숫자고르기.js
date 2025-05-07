const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input[0]);
const arr = [0, ...input.slice(1).map(Number)];

const visited = Array(N + 1).fill(false);
const finished = Array(N + 1).fill(false);

const results = [];

for(let i = 1; i <= N; i++) {
    if(!visited[i]) {
        dfs(i);
    }
}

function dfs(now) {
    visited[now] = true;
    const next = arr[now];

    if(!visited[next]) {
        dfs(next);
    } else if(!finished[next]) {
        // 사이클이니 경로를 넣기 
        let i = next;
        while (i !== now) {
            results.push(i);
            i = arr[i];
        }
        results.push(now);
    }
    finished[now] = true;
}

const answer = Array.from(new Set(results)).sort((a, b) => a - b);
console.log(answer.length);
console.log(answer.join('\n'));
