const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number)
const info = input.slice(1, n+1).map((x) => x.split(' ').map(Number))
const graph = Array.from({length: n+1}, () => Array(m+1).fill(0))
const [h, w, sr, sc, fr, fc] = input[n+1].split(' ').map(Number)
const dRow = [-1, 1, 0, 0]
const dCol = [0, 0, -1, 1]

for(let i = 1; i <= n; i++) {
    for(let j = 1; j <= m; j++) {
        graph[i][j] = info[i - 1][j - 1]
    }
}

const ps = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
for (let i = 1; i <= n; i++) {
    let rowSum = 0;
    for (let j = 1; j <= m; j++) {
        rowSum += graph[i][j];
        ps[i][j] = ps[i - 1][j] + rowSum;
    }
}

function bfs(startR, startC) {
    const queue = [[startR, startC, 0]]
    const visited = Array.from({length: n+1}, () => Array(m + 1).fill(false))
    let index = 0
    
    while(queue.length > index) {
        const [curR, curC, curDist] = queue[index]
        if(curR === fr && curC === fc) return curDist
        
        for(let i = 0; i < 4; i++) {
            const nextR = curR + dRow[i]
            const nextC = curC + dCol[i]
            const nextDist = curDist + 1
            if(nextR >= 1 && nextR + h - 1 <= n && nextC >= 1 && nextC + w - 1 <= m && !visited[nextR][nextC] && graph[nextR][nextC] === 0) {
                // 누적합으로 직사각형 내부에 벽 존재 여부 체크
                const r2 = nextR + h - 1;
                const c2 = nextC + w - 1;
                const sum = ps[r2][c2] - ps[nextR - 1][c2] - ps[r2][nextC - 1] + ps[nextR - 1][nextC - 1];
                if (sum === 0) { // 내부에 벽이 없을 때만 이동
                    visited[nextR][nextC] = true
                    queue.push([nextR, nextC, nextDist])
                }
            }
        }
        index += 1
    }
    return -1
}

console.log(bfs(sr, sc))
