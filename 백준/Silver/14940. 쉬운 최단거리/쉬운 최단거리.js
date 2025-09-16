const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const graph = input.slice(1).map((x) => x.split(' ').map(Number));

// 모든 지점까지의 거리를 저장할 배열
// 초기에는 도달할 수 없는 곳을 -1로, 갈 수 없는 땅은 0으로 설정
const dist = Array.from({ length: n }, () => Array(m).fill(-1));
const dy = [-1, 1, 0, 0]; 
const dx = [0, 0, -1, 1]; 

const queue = [];
let targetY, targetX;

// 1. 목표 지점(2)의 위치를 찾고 dist 배열 초기화
for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if (graph[i][j] === 2) {
            targetY = i;
            targetX = j;
            dist[i][j] = 0; // 목표 지점은 거리가 0
            queue.push([targetY, targetX, 0]); // 큐에 [y, x, 거리] 형태로 저장
        } else if (graph[i][j] === 0) {
            dist[i][j] = 0; // 갈 수 없는 땅은 거리 0 
        }
    }
}

// 2. 목표 지점에서 시작하는 BFS 실행
let head = 0; // 큐의 첫 요소를 가리키는 포인터 (쉬프트 대신 인덱스 사용)
while (queue.length > head) {
    const [curY, curX, d] = queue[head++]; // 현재 위치와 현재까지의 거리
    
    for (let i = 0; i < 4; i++) {
        const nextY = curY + dy[i];
        const nextX = curX + dx[i];

        // 지도의 유효 범위 체크
        if (nextY >= 0 && nextY < n && nextX >= 0 && nextX < m) {
            // 갈 수 없는 땅이 아니고, 아직 방문하지 않은 곳(-1)인 경우
            if (graph[nextY][nextX] === 1 && dist[nextY][nextX] === -1) {
                dist[nextY][nextX] = d + 1; // 거리 업데이트
                queue.push([nextY, nextX, d + 1]); // 큐에 다음 위치와 거리 추가
            }
        }
    }
}

for (let i = 0; i < n; i++) {
    console.log(dist[i].join(' '));
}
