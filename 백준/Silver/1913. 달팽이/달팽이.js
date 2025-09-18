const fs = require('fs');
const [N, K] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);
const grid = Array.from({ length: N }, () => Array(N).fill(0));
let num = N * N; // 넣어줄 숫자를 담을 변수. 초기값은 N * N부터 넣어준다.
// 아래, 오른, 위, 왼 순서로 방향이 이동된다.
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
// 방향을 순서대로 0, 1, 2, 3으로 붙인다. 
let direction = 0; // 처음은 아래
let targetX, targetY; // 나중에 K를 만나면 저장
// 처음 위치 인덱스는 0, 0에서 시작
let x = 0;
let y = 0;
let nx = 0;
let ny = 0; 

// 가장 큰 수부터 1까지 줄이면서 grid를 채울 것이다.
while(num >= 1) {
    if(num === K) {
        targetX = x + 1;
        targetY = y + 1;
    }
    grid[y][x] = num;

    // 다음 좌표를 계산
    nx = x + dx[direction];
    ny = y + dy[direction];

    // 유효한 범위 및 위치가 아니기 때문에 방향을 바꿔야 된다.
    if(nx < 0 || nx >= N || ny < 0 || ny >= N || grid[ny][nx] !== 0) {
        // 0,1,2,3 이후에 다시 0으로 돌아와야 되기 때문에
        direction = [direction + 1] % 4;
        nx = x + dx[direction];
        ny = y + dy[direction];
    }
    x = nx;
    y = ny;
    num--;
}
console.log(grid.map((x) => x.join(' ')).join('\n'));
console.log(targetY, targetX);
