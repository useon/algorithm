const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const computerNumber = Number(input[0]);
const connectNumber = Number(input[1]);
const info = input.slice(2).map((x) => x.split(' ').map(Number));
const graph = Array.from({ length: computerNumber + 1 }, () => Array(computerNumber + 1).fill(0));
let count = 0;

// 그래프 그리기
info.forEach((x) => {
    const [a, b] = x;
    graph[a][b] = 1;
    graph[b][a] = 1;
})
const visited = Array(computerNumber + 1).fill(false);

// 1번 컴퓨터를 통해 웜 바이러스에 걸리게 되는 컴퓨터의 수?

bfs(1);

function bfs(start) {
    const queue = [start];
    visited[start] = true;
    while(queue.length > 0) {
        const cur = queue.shift();
        graph[cur].forEach((next, index) => {
            if(next === 1 && !visited[index]) {
                visited[index] = true;
                queue.push(index);
                count += 1;
            }
        })
    }
}

console.log(count);
