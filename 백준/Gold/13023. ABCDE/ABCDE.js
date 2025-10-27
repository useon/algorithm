const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const graph = Array.from({length: n}, () => [])
const visited = Array(n).fill(false)

for(let i = 1; i <= m; i++) {
   const [a, b] = input[i].split(' ').map(Number)
    graph[a].push(b)
    graph[b].push(a)
}

function dfs(node, depth) {
    if(depth === 5) return true
    visited[node] = true
    for(const next of graph[node]) {
        if(!visited[next] && dfs(next, depth + 1)) return true
    }
    visited[node] = false
    return false
}

function findRelation() {
    for(let i = 0; i < n; i++) {
        if(dfs(i, 1)) {
            return 1
        }
    }
    return 0
}

console.log(findRelation())
