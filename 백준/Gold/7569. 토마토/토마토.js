const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
// 가로 m, 세로 n, 높이 h 
const [m, n, h] = input[0].split(' ').map(Number);
const graph = []
let emptyNum = 0
const ripePositions = []
const visited = Array.from({length: h}, () => Array.from({length: n}, () => Array(m).fill(false)))
const dH = [-1, 1, 0, 0, 0, 0]
const dR = [0, 0, -1, 1, 0, 0]
const dC = [0, 0, 0, 0, -1, 1]
let ripeNum = 0

// graph 만들기
for(let i = 0; i < h; i++) {
    const start = i * n + 1
    const end = start + n
    const line = input.slice(start, end).map((x) => x.split(' ').map(Number))
    graph.push(line)
}

// 만들어진 graph를 순회하며 익은 자리와 -1 자리를 구하기
for(let i = 0; i < h; i++) {
    for(let j = 0; j < n; j++) {
        for(let k = 0; k < m; k++) {
            if(graph[i][j][k] === -1) {
                emptyNum += 1
                visited[i][j][k] = true
            } else if(graph[i][j][k] === 1) {
                ripePositions.push([i, j, k, 0])
                visited[i][j][k] = true
            }
        }
    }
}

let totalTomatoNum = m * n * h - emptyNum
ripeNum += ripePositions.length

function bfs(positions) {
    if(totalTomatoNum === ripeNum) return 0
    const queue = [...positions]
    let index = 0
    // 이미 처음에 들어오는 익은 자리의 방문처리는 이미 위에서 함.
    while(queue.length > index) {
        const [curH, curR, curC, curD] = queue[index]
        
        for(let i = 0; i < 6; i++) {
            const nextH = curH + dH[i]
            const nextR = curR + dR[i]
            const nextC = curC + dC[i]
            const nextD = curD + 1

            if(nextH >= 0 && nextH < h && nextR >= 0 && nextR < n && nextC >= 0 && nextC < m && !visited[nextH][nextR][nextC] && graph[nextH][nextR][nextC] === 0) {
                visited[nextH][nextR][nextC] = true
                queue.push([nextH, nextR, nextC, nextD])
                ripeNum += 1
                
                if(ripeNum === totalTomatoNum) {
                    return nextD
                }
            }
        }
        index += 1
    }
    return -1
}

console.log(bfs(ripePositions))
