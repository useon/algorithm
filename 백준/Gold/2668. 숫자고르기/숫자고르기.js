const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = Number(input[0])
const first = Array.from({ length: n }, (_, i) => i + 1)
const secend = input.slice(1).map(Number)
const graph = Array.from({length: n+1}, () => [])
const visited = Array(n+1).fill(false)
let result = []

for(let i = 1; i <= n; i++) {
    graph[i].push(secend[i-1])
}

function dfs(path, node, depth) {
    if(path === node && depth > 1) {
        return true
    }

    visited[node] = true
    for(const next of graph[node]) {
        if (next === path) {
          visited[node] = false;
          return true;
        }
        if(!visited[next]) {
            if(dfs(path, next, depth + 1)) {
                visited[node] = false
                return true
            } 
        }
    }
    visited[node] = false
    return false
}

for(let i = 1; i <= n; i++) {
    visited.fill(false)
    if(dfs(i, i, 1)) result.push(i)
}

console.log(result.length)
console.log(result.sort((a, b) => a - b).join('\n'))
