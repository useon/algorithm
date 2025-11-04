const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, l, r] = input[0].split(' ').map(Number)
const info = input.slice(1).map((x) => x.split(' ').map(Number))
const graph = Array.from({length: n+1}, () => Array(n+1).fill(0))
const dRow = [-1, 1, 0, 0]
const dCol = [0, 0, -1, 1]

for(let i = 1; i <= n; i++) {
  for(let j = 1; j <= n; j++) {
    graph[i][j] = info[i-1][j-1]
  }
}

function bfs(startRow, startCol, visited) {
  const queue = [[startRow, startCol]]
  visited[startRow][startCol] = true

  const changePosition = new Set()
  changePosition.add(`${startRow} ${startCol}`)

  let index = 0
  while(queue.length > index) {
    const [curRow, curCol] = queue[index]

    for(let i = 0; i < 4; i++) {
      const nextRow = curRow + dRow[i]
      const nextCol = curCol + dCol[i]

      if (nextRow < 1 || nextRow > n || nextCol < 1 || nextCol > n) continue
      if (visited[nextRow][nextCol]) continue

      const distance = Math.abs(graph[curRow][curCol] - graph[nextRow][nextCol])
      
      if (distance >= l && distance <= r) {
        visited[nextRow][nextCol] = true
        queue.push([nextRow, nextCol])
        changePosition.add(`${nextRow} ${nextCol}`)
      }
    }
    index += 1
  }

  const teamCount = changePosition.size
  if (teamCount <= 1) return false

  let teamPeople = 0
  for (const s of changePosition) {
    const [row, col] = s.split(' ').map(Number)
    teamPeople += graph[row][col]
  }
  const changePeople = Math.floor(teamPeople / teamCount)

  for (const k of changePosition) {
    const [row, col] = k.split(' ').map(Number)
    graph[row][col] = changePeople
  }
  return true 
}

function solve() {
  let count = 0
  while (true) {
    const visited = Array.from({length:n+1}, () => Array(n+1).fill(false))
    let moved = false

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        if (!visited[i][j]) {
          const didMove = bfs(i, j, visited)
          if (didMove) moved = true
        }
      }
    }

    if (!moved) return count 
    count += 1               
  }
}

console.log(solve())
