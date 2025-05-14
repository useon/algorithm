const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [R, C] = input[0].split(' ').map(Number);
const graph = input.slice(1).map((x) => x.split(''));
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

// 좌표 먼저 구하기
const waterQueue = [];
const dochiQueue = [];
const visited = Array.from({length: R}, () => Array(C).fill(false));

for(let i = 0; i < R; i++) {
    for(let j = 0; j < C; j++) {
        if(graph[i][j] === 'S') {
            dochiQueue.push([i, j, 0]);
            visited[i][j] = true;
        }
        if(graph[i][j] === '*') {
            waterQueue.push([i, j]);
        }
    }
}

// 하나의 bfs를 돌린다. 하지만 두 개의 큐를 둔다.
// 하나는 물, 하나는 고슴도치
// 고슴도치큐가 빌때까지 돈다!

function bfs() {
    while(dochiQueue.length > 0) {

        // 물확장
        const waterLength = waterQueue.length;
        for(let i = 0; i < waterLength; i++) {
            const [curWaterX, curWaterY] = waterQueue.shift();        
            for(let dir = 0; dir < 4; dir++) {
                const nextWaterX = curWaterX + dx[dir];
                const nextWaterY = curWaterY + dy[dir];
                if(nextWaterX >= 0 && nextWaterX < R && nextWaterY >= 0 && nextWaterY < C && graph[nextWaterX][nextWaterY] === '.') {
                    waterQueue.push([nextWaterX, nextWaterY]);
                    graph[nextWaterX][nextWaterY] = '*';
                }
            }
        }


        // 고슴도치 이동
        const dochiLength = dochiQueue.length;
        for(let i = 0; i < dochiLength; i++) {
            const [curDochiX, curDochiY, curTime] = dochiQueue.shift(); 
            for(let dir = 0; dir < 4; dir++) {
                const nextDochiX = curDochiX + dx[dir];
                const nextDochiY = curDochiY + dy[dir];
    
                if(nextDochiX >= 0 && nextDochiX < R && nextDochiY >= 0 && nextDochiY < C && !visited[nextDochiX][nextDochiY]) {
                    if(graph[nextDochiX][nextDochiY] === '.') {
                        dochiQueue.push([nextDochiX, nextDochiY, curTime + 1]);
                        visited[nextDochiX][nextDochiY] = true;
                    }
                    if(graph[nextDochiX][nextDochiY] === 'D') {
                        return curTime + 1;
                    }
                }
            }
        }
    }
    return 'KAKTUS'
}

console.log(bfs());
