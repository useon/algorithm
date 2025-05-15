const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const info = input.slice(1).map((x) => x.split(' ').map(Number));
const zeroPositions = [];
const virusPositions = [];
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

//  브루트포스 돌면서 모든 0의 좌표 수집
for(let i = 0; i < N; i++) {
    for(let j = 0; j < M; j++) {
        if(info[i][j] === 0) {
            zeroPositions.push([i, j]);
        }
        if(info[i][j] === 2) {
            virusPositions.push([i, j]);
        }
    }
}
const combinations = getCombinations(zeroPositions, 3);

// 해당 좌표들 중에서 3개의 조합 구하기
function getCombinations(arr, r) {
    const result = [];
    const temp = [];

    function backtrack(start) {
        if (temp.length === r) {
            result.push([...temp]);
            return;
        }

        for (let i = start; i < arr.length; i++) {
            temp.push(arr[i]);
            backtrack(i + 1);
            temp.pop();
        }
    }

    backtrack(0);
    return result;
}

// combinations의 모든 경우를 돌면서 최대 영역인 경우를 구하기
let maxCount = 0;
for(let i = 0; i < combinations.length; i++) {
    const graph = info.map(row => [...row]);
    const [first, second, third] = combinations[i];
    graph[first[0]][first[1]] = 1;
    graph[second[0]][second[1]] = 1;
    graph[third[0]][third[1]] = 1;
    maxCount = Math.max(maxCount, bfs(graph));
}
    

// bfs 마다 벽을 새롭게 세운 맵으로 돌아야 함
function bfs(graph) {
    const virusQueue = [...virusPositions.map(([x, y]) => [x, y])];

    for(let i = 0; i < virusQueue.length; i++) {
        const [x, y] = virusQueue[i];
    }

    while(virusQueue.length > 0) {
        const [curX, curY] = virusQueue.shift();
        for(let dir = 0; dir < 4; dir++) {
            const [nextX, nextY] = [curX + dx[dir], curY + dy[dir]];

            if(nextX >= 0 && nextX < N && nextY >= 0 && nextY < M && graph[nextX][nextY] === 0) {
                virusQueue.push([nextX, nextY]);
                graph[nextX][nextY] = 2;
            }
        }
    }
    return checkZero(graph);
}

// 안전 영역 세기
function checkZero(graph) {
    let zeroCount = 0;

    for(let i = 0; i < N; i++) {
        for(let j = 0; j < M; j++) {
            if(graph[i][j] === 0) zeroCount += 1;
        }
    }
    return zeroCount;
}

console.log(maxCount);
