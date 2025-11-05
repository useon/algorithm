const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = Number(input[0])
const info = input.slice(1).map((x) => x.split(' ').map(Number))
const graph = Array.from({length: n+1}, () => [])

for(const i of info) {
    const [parent, child, weight] = i
    graph[parent].push([child, weight])
    graph[child].push([parent, weight])
}

function bfs(start) {
    const queue = [[start, 0]]
    const visited = Array(n + 1).fill(false)
    let farNode = start
    let farDist = 0
    let index = 0
    visited[start] = true
    
    while(queue.length > index) {
        const [curNode, curDist] = queue[index++]
        if(curDist > farDist) {
            farDist = curDist
            farNode = curNode
        }
        
        for(const [nextNode, nextDist] of graph[curNode]) {
            if(!visited[nextNode]) {
                visited[nextNode] = true
                queue.push([nextNode, nextDist + curDist])
            }
        }
    }
    return {farNode, farDist}
}

function solve() {
    const { farNode: a } = bfs(1)
    const { farDist: result } = bfs(a)
    return result
}

console.log(solve())
