const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
// 크기 N, M 제한시간 T
const [N, M, T] = input[0].split(' ').map(Number);
// 공주에게 도달할 수 있는 최단 시간을 출력
const info = input.slice(1).map((x) => x.split(' ').map(Number));
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const result = bfs(0, 0);
console.log(result);

// 시작 x, y 좌표를 통해 ~ N, M까지 가는 시간을 구해야 한다.
function bfs(x, y) {
    const queue = [[0, 0, 0, 0]];
    // visited에 그람 없는 방문, 그람 있는 방문을 가지고 있다.
    const visited = Array.from({ length: N }, () => 
        Array.from({ length: M }, () => Array(2).fill(false))
    );    
    visited[0][0][0] = true;
    
    while(queue.length > 0) {
        const [curX, curY, hasGram, time] = queue.shift();

        if(curX === N - 1 && curY === M - 1) {
            return time > T ? 'Fail' : time;
        }
        
        for(let i = 0; i < 4; i++) {
            const nx = curX + dx[i];
            const ny = curY + dy[i];

            if(nx >= 0 && nx < N && ny >= 0 && ny < M) {
                // 그람을 만나면 넣어준다.
                if(!visited[nx][ny][hasGram] && !hasGram && info[nx][ny] === 2) {
                    visited[nx][ny][hasGram] = true;
                    queue.push([nx, ny, true, time + 1]);
                }
                // 벽이고 그람을 가지고 있는 경우는 벽을 부순다.
                if(!visited[nx][ny][hasGram] && info[nx][ny] === 1 && hasGram) {
                    visited[nx][ny][hasGram] = true;
                    queue.push([nx, ny, hasGram, time + 1]);
                }
                // 벽이 아닌 경우
                if(!visited[nx][ny][hasGram] && info[nx][ny] === 0) {
                    visited[nx][ny][hasGram] = true;
                    queue.push([nx, ny, hasGram, time + 1]);
                }
            }
        }
    }
    return 'Fail'
}