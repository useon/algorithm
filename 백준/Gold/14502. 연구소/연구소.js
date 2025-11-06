const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number)
const graph = input.slice(1).map((x) => x.split(' ').map(Number))
const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
const virusPositions = []
const zeroPositions = []

for(let i = 0; i < n; i++) {
    for(let j = 0; j < m; j++) {
        if(graph[i][j] === 0) {
            zeroPositions.push([i, j])
        } else if(graph[i][j] === 2) {
            virusPositions.push([i, j])
        }
    }
}

function simulate(a, b, c) {
    const grid = []
    let safeZone = 0
    for(let i = 0; i < n; i++) {
        grid.push([...graph[i]])
    }

    const [r1, c1] = zeroPositions[a]
    const [r2, c2] = zeroPositions[b]
    const [r3, c3] = zeroPositions[c]

    grid[r1][c1] = 1
    grid[r2][c2] = 1
    grid[r3][c3] = 1

    // 이제 바이러스를 퍼뜨리기
    const queue = [...virusPositions]    
    let index = 0

    while(queue.length > index) {
        const [curRow, curCol] = queue[index++]

        for(let i = 0; i < 4; i++) {
            const [nextRow, nextCol] = [curRow + directions[i][0], curCol + directions[i][1]]

            if(nextRow >= 0 && nextRow < n && nextCol >= 0 && nextCol < m && grid[nextRow][nextCol] === 0) {
                grid[nextRow][nextCol] = 2
                queue.push([nextRow, nextCol])
            }
        }
    }

    // 남은 0의 수 세기
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            if(grid[i][j] === 0) safeZone += 1
        }
    }
    return safeZone
}

const z = zeroPositions.length
let maxSafeZone = 0
// 조합
for(let a = 0; a < z; a++) {
    for(let b = a + 1; b < z; b++) {
        for(let c = b + 1; c < z; c++) {
            maxSafeZone = Math.max(maxSafeZone, simulate(a, b, c))
        }
    }
}

console.log(maxSafeZone)
