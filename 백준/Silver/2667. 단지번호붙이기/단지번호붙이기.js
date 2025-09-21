const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const graph = input.slice(1).map((x) => x.split('').map(Number));
// 1은 집이 있는 곳, 0은 집이 없는 곳
// 각 영역에 해당하는 수만 어떻게 체크할까? -> 이게 핵심

const visited = Array.from({length: N}, () => Array(N).fill(false));
const result = [];
// 좌, 우, 아래, 위로 연결될 수 있다.
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

for(let i = 0; i < N; i++) {
    for(let j = 0; j < N; j++) {
        // 해당 부분의 조건을 걸어서 영역별로 끊어갈 수 있도록 한다.
        // 이미 단지로 체크된 부분은 이미 방문처리 됐기 때문에 전체 가구 조사를 한다고 해도 bfs를 돌지 않는다.
        if(!visited[i][j] && graph[i][j] === 1) {
            const houseCount = bfs(i, j);
            if(houseCount > 0) {
                result.push(houseCount);
            }
        }
    }
}

function bfs(row, col) {
    // 이 집부터 포함해야되니까 1부터
    let count = 1;
    const queue = [[row, col]];
    // 해당 위치 방문처리 필요
    visited[row][col] = true;
    
    while(queue.length) {
        const [curRow, curCol] = queue.shift(); 

        for(let i = 0; i < 4; i++) {
            const nextRow = curRow + dx[i];
            const nextCol = curCol + dy[i];

            if(nextRow >= 0 && nextRow < N && nextCol >= 0 && nextCol < N && graph[nextRow][nextCol] === 1 && !visited[nextRow][nextCol]) {
                visited[nextRow][nextCol] = true;
                queue.push([nextRow, nextCol]);
                count++;
            }
        }
    }
    return count;
}

// 영역 출력, 각 단지에 속하는 집의 수를 오름차순으로 정렬하여 출력!
console.log(result.length);
console.log(result.sort((a, b) => a - b).join('\n'));
