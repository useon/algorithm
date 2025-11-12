const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [r, c] = input[0].split(' ').map(Number)
const graph = input.slice(1).map((x) => x.split(''))
const dRow = [-1, 1, 0, 0]
const dCol = [0, 0, -1, 1]

// 불 퍼뜨리기
function spreadFire(position) {
    const fP = []

    for(let i = 0; i < position.length; i++) {
        const [curRow, curCol] = position[i]

        for(let j = 0; j < 4; j++) {
            const nextRow = curRow + dRow[j]
            const nextCol = curCol + dCol[j]

            if(nextRow >= 0 && nextRow < r && nextCol >= 0 && nextCol < c && graph[nextRow][nextCol] === '.') {
                graph[nextRow][nextCol] = 'F'
                fP.push([nextRow, nextCol])
            }
        }
    }
    return fP
}

// 지훈이 좌표, 불 좌표, 방문여부
function simulate(jP, fP, visited) {
    const jNext = []
    
    // 지훈이가 불이랑 만나면 안되니까 불 먼저 퍼뜨리기
    const fNext = spreadFire(fP)
    
    // 지훈이 좌표 방문처리, 지훈 이동 가능 좌표 구하기
    for(let i = 0; i < jP.length; i++) {
        const [jR, jC] = jP[i]
        visited[jR][jC] = true
        for(let j = 0; j < 4; j++) {
            const nextRow = jR + dRow[j]
            const nextCol = jC + dCol[j]

            if(nextRow >= 0 && nextRow < r && nextCol >= 0 && nextCol < c && graph[nextRow][nextCol] === '.' && !visited[nextRow][nextCol]) {
                // 미로의 가장자리이면 탈출
                if(nextRow === 0 || nextRow === r - 1 || nextCol === 0 || nextCol === c - 1) return {escaped: true, jNext, fNext}
                jNext.push([nextRow, nextCol])
                visited[nextRow][nextCol] = true
            }
        }
    }
    return {escaped: false, jNext, fNext}
}

function solve() {
    let move = 1
    let jPosition = []
    let firePosition = []
    const visited = Array.from({length: r}, () => Array(c).fill(false))

    // 지훈이의 위치와 불의 위치를 구한다.
    for(let i = 0; i < r; i++) {
        for(let j = 0; j < c; j++) {
            if(graph[i][j] === 'J') {
                if(i === 0 || i === r - 1 || j === 0 || j === c - 1) return move
                graph[i][j] = '.'
                jPosition.push([i, j])
            } else if(graph[i][j] === 'F') {
                firePosition.push([i, j])
            }
        }
    }
    
    while(true) {
        move += 1
        const {escaped, jNext, fNext} = simulate(jPosition, firePosition, visited)
        if(escaped) return move
        if(jNext.length === 0) return 'IMPOSSIBLE'
        jPosition = jNext
        firePosition = fNext
    }
}

console.log(solve())
    