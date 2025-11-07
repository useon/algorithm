const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [r, c] = input[0].split(' ').map(Number)
const graph = input.slice(1).map((x) => x.split(' ').map(Number))
const dRow = [-1, 1, 0, 0]
const dCol = [0, 0, -1, 1]

function bfs(startRow, startCol) {
    const queue = [[startRow, startCol]] // 0인 칸이 queue에 들어간다.
    const visited = Array.from({length: r}, () => Array(c).fill(false))
    visited[startRow][startCol] = true
    const sidePositions = new Set() // 1인 겉면이 set에 들어간다.
    let index = 0

    // 남아 있는 치즈 개수 세기(녹이기 전)
    let cheezeCount = 0
    for(let i = 0; i < r; i++) {
        for(let j = 0; j < c; j++) {
            if(graph[i][j] === 1) cheezeCount += 1
        }
    }
    
    while(queue.length > index) {
        const [curRow, curCol] = queue[index++]

        for(let i = 0; i < 4; i++) {
            const nextRow = curRow + dRow[i]
            const nextCol = curCol + dCol[i]

            if(nextRow >= 0 && nextRow < r && nextCol >= 0 && nextCol < c && !visited[nextRow][nextCol]) {
                if(graph[nextRow][nextCol] === 1) {
                    // 이 경우에는 겉면이니까 sidePositions에 넣어준다.
                    // 여기서 바로 방문 처리하면 겉면 구하는 0으로 쓰지 못하니까.
                    sidePositions.add(`${nextRow} ${nextCol}`)                
                } else {
                    // 0인 경우에만 방문 처리
                    queue.push([nextRow, nextCol])
                    visited[nextRow][nextCol] = true
                }
            }  
        }
    }
    if(sidePositions.size === 0) return 0

    // 치즈 겉면을 녹이자
    for(const position of sidePositions) {
        const [row, col] = position.split(' ').map(Number)
        graph[row][col] = 0
    }

    return cheezeCount
}
    
function solve() {
    let time = 0
    let cheeze = 0
    while(true) {
        const result = bfs(0, 0)
        if(result === 0) {
            return [time, cheeze]
        } else {
            cheeze = result
        }
        time += 1
    }
}

console.log(solve().join('\n'))
