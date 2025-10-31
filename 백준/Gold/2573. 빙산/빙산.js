const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
// n - 행, m - 열
const [n, m] = input[0].split(' ').map(Number)
const graph = input.slice(1).map((x) => x.split(' ').map(Number))

const dRow = [-1, 1, 0, 0]
const dCol = [0, 0, -1, 1]

function bfs(row, col, visited, melting) {
  const queue = [[row, col]]
  let index = 0
  visited[row][col] = true

  while (queue.length > index) {
    const [curRow, curCol] = queue[index]
    let zeroCount = 0

    for (let i = 0; i < 4; i++) {
      const nextRow = curRow + dRow[i]
      const nextCol = curCol + dCol[i]

      if (nextRow >= 0 && nextRow < n && nextCol >= 0 && nextCol < m) {
        if (graph[nextRow][nextCol] === 0) {
          zeroCount += 1
        } else if (!visited[nextRow][nextCol]) {
          visited[nextRow][nextCol] = true
          queue.push([nextRow, nextCol])
        }
      }
    }

    if (zeroCount > 0 && graph[curRow][curCol] !== 0) {
      melting.push([curRow, curCol, zeroCount])
    }
    index += 1
  }
}

function solve() {
  let year = 0
  while (true) {
    const visited = Array.from({ length: n }, () => Array(m).fill(false))
    const melting = []
    let count = 0

    // 덩어리 수 세기
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (graph[i][j] > 0 && !visited[i][j]) {
          bfs(i, j, visited, melting)
          count += 1
        }
      }
    }

    if (count >= 2) return year
    if (count === 0) return 0

    // 녹이기
    for (const [row, col, zeroCount] of melting) {
      graph[row][col] = Math.max(0, graph[row][col] - zeroCount)
    }

    year += 1
  }
}

console.log(solve())
