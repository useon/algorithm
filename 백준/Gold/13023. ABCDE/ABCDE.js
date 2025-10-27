const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const info = input.map((x) => x.split(' ').map(Number))
const [N, M] = info[0];
const friends = info.slice(1);

const graph = Array.from({ length: N }, () => []);
for (let i = 0; i < M; i++) {
  const [a, b] = friends[i];
  graph[a].push(b);
  graph[b].push(a); 
}

const visited = Array(N).fill(false);
let done = false; 
for(let i = 0; i < N; i++) {
    dfs(i, 0);
    if(done) break;
}

done ? console.log(1) : console.log(0);

function dfs(current, depth) {
    if(depth === 4) {
        done = true;
        return;
    }
    
    visited[current] = true;

    for(const next of graph[current]) {
        if(!visited[next]) {
            dfs(next, depth + 1);
        }
    }
    visited[current] = false;
}
