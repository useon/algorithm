const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const T = Number(input[0]);
const info = input.slice(1);
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

for(let i = 0; i < info.length; i++) {
    const [M, N, K] = info[i].split(' ').map(Number);
    const locations = info.slice(i + 1, i + 1 + K).map((x) => x.split(' ').map(Number));
    const graph = Array.from({length: M}, () => Array(N).fill(false));
    const visited = Array.from({length: M}, () => Array(N).fill(false));
    let count = 0;

    // 주어진 위치 정보를 통해 그래프 채우기
    for(let j = 0; j < K; j++) {
        const [positionX, positionY] = locations[j];
        graph[positionX][positionY] = 1;
    }
    
    //  방문하지 않은 좌표만 돌기 
    for(let x = 0; x < M; x++) {
        for(let y = 0; y < N; y++) {
            if(graph[x][y] === 1 && !visited[x][y]) {
                bfs(x, y, graph, visited, M, N);
                count++;
            }
        }
    }
    console.log(count);
    i += K // 다음 케이스로 넘어가기 K만큼만 넘어가야지 for문 끝나면서 +1이 됨.
}

function bfs(x, y, graph, visited, M, N) {
    const queue = [[x, y]]; 

    while(queue.length > 0) {
        const [curX, curY] = queue.shift();
        for(let i = 0; i < 4; i++) {
            const nextX = curX + dx[i];
            const nextY = curY + dy[i];

            if(nextX >= 0 && nextX < M && nextY >= 0 && nextY < N && graph[nextX][nextY] === 1 && !visited[nextX][nextY]) {
                queue.push([nextX, nextY]);
                visited[nextX][nextY] = true;
            }
        }
    }
}
