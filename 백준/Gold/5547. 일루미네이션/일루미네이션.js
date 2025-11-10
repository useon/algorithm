const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [w, h] = input[0].split(' ').map(Number)
const info = input.slice(1).map((x) => x.split(' ').map(Number))
const graph = Array.from({length: h+2}, () => Array(w+2).fill(0))
const even = [[-1, -1], [-1, 0], [0, -1], [0, 1], [1, -1], [1, 0]]
const odd = [[-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0], [1, 1]]
const visited = Array.from({length: h+2}, () => Array(w+2).fill(false))

for(let i = 1; i <= h; i++) {
    for(let j = 1; j <= w; j++) {
        graph[i][j] = info[i-1][j-1]
    }
}

function bfs(startRow, startCol) {
    const queue = [[startRow, startCol]]
    visited[startRow][startCol] = true
    let index = 0
    let totalCount = 0
    
    while(queue.length > index) {
        const [curRow, curCol] = queue[index++]
        let count = 0
        const isEven = curRow % 2 === 0
        if(graph[curRow][curCol] === 0) {  
            for(let i = 0; i < 6; i++) {
                const nextRow = isEven ? even[i][0] + curRow : odd[i][0] + curRow 
                const nextCol = isEven ? even[i][1] + curCol : odd[i][1] + curCol 

                if(nextRow >= 0 && nextRow <= h + 1 && nextCol >= 0 && nextCol <= w + 1 && !visited[nextRow][nextCol]) {
                    if(graph[nextRow][nextCol] === 1) {
                        count += 1
                    } else {
                        visited[nextRow][nextCol] = true
                        queue.push([nextRow, nextCol])
                    }
                } 
            }
        }
        totalCount += count
    }
    return totalCount
}

console.log(bfs(0, 0))
