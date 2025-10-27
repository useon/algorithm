const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [m, n] = input[0].split(' ').map(Number);
const graph = input.slice(1).map((x) => x.split(' ').map(Number))
const ripePositions = []
const visited = Array.from({length: n}, () => Array(m).fill(false))
const dRow = [-1, 1, 0, 0]
const dCol = [0, 0, -1, 1]
let ripeNum = 0
let emptyNum = 0

for(let i = 0; i < n; i++) {
    for(let j = 0; j < m; j++) {
        if(graph[i][j] === 1) {
            ripePositions.push([i, j, 0])
            visited[i][j] = true
        } else if(graph[i][j] === -1) {
            emptyNum += 1
        }
    }
}

ripeNum += ripePositions.length
const totalNum = n * m - emptyNum

function checkRipe(positions) {
    const queue = [...positions]
    let index = 0

    while(queue.length > index) {
        const [curRow, curCol, curDay] = queue[index]

        for(let i = 0; i < 4; i++) {
            const nextRow = curRow + dRow[i]
            const nextCol = curCol + dCol[i]
            const nextDay = curDay + 1

            if(nextRow >= 0 && nextRow < n && nextCol >= 0 && nextCol < m && !visited[nextRow][nextCol] && graph[nextRow][nextCol] === 0) {
                visited[nextRow][nextCol] = true
                queue.push([nextRow, nextCol, nextDay])
                ripeNum += 1
                
                if(ripeNum === totalNum) {
                    return nextDay
                }
            }
        }
        index += 1
    }
    return -1
}

function solve() {
    if(ripePositions.length === totalNum) {
        return 0
    }
    return checkRipe(ripePositions)
}

console.log(solve())
