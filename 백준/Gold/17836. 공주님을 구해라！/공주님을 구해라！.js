const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m, t] = input[0].split(' ').map(Number);
const graph = [Array(n+1).fill(0)]
const dRow = [-1, 1, 0, 0]
const dCol = [0, 0, -1, 1]

for(let i = 1; i <= n; i++) {
    const line = [0, ...input[i].split(' ').map(Number)]
    graph.push(line)
}

function bfs(startRow, startCol) {
    const queue = []
    let index = 0
    let shortestTime = Infinity
    const visited = Array.from({length: n + 1}, () => Array.from({length: m + 1}, () => [false, false]))
    queue.push([startRow, startCol, 0, false])
    visited[startRow][startCol][0] = true

    while(queue.length > index) {
        const [curRow, curCol, curTime, hasGram] = queue[index]

        if(curRow === n && curCol === m) {
            shortestTime = Math.min(shortestTime, curTime)
        }

        for(let i = 0; i < 4; i++) {
            const nextRow = curRow + dRow[i]
            const nextCol = curCol + dCol[i]
            const nextTime = curTime + 1

            // 범위와 방문 여부 체크
            if(nextRow > 0 && nextRow <= n && nextCol > 0 && nextCol <= m) {
                // gram 여부에 따라서 가능한 경로가 달라짐
                // 지금 gram을 가지고 있거나 다음 자리에서 가지게 된다면 다음 위치를 queue에 넣어준다.
                if((hasGram || graph[nextRow][nextCol] === 2) && !visited[nextRow][nextCol][1]) {
                    queue.push([nextRow, nextCol, nextTime, true])
                    visited[nextRow][nextCol][1] = true
                } else if(!hasGram && graph[nextRow][nextCol] == 0 && !visited[nextRow][nextCol][0]) {
                    queue.push([nextRow, nextCol, nextTime, false])
                    visited[nextRow][nextCol][0] = true
                }
            }
        }
        index += 1
    }
    return shortestTime
}

const arrivedTime = bfs(1, 1)
arrivedTime > t ? console.log('Fail') : console.log(arrivedTime)
