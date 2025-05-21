const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input[0]);
const info = input.slice(1, N).map((x) => x.split(' ').map(Number));
const Q = Number(input[N]);
const questions = input.slice(N + 1).map((x) => x.split(' ').map(Number));

// 그래프 채우기
const graph = Array.from({ length: N + 1 }, () => []);
for(let i = 0; i < N - 1; i++) {
    const [a, b] = info[i];
    graph[a].push(b);
    graph[b].push(a);
}

for(let i = 0; i < Q; i++) {
    const [question, k] = questions[i];

    if(question === 1) {
        if(graph[k].length > 1) {
            console.log('yes');
        } else {
            console.log('no');
        }
    } else if(question === 2) {
        console.log('yes');
    }
}
