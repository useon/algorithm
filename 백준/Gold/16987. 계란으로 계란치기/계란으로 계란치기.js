const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input[0]);
// 내구도, 무게로 구성
const eggs = input.slice(1).map((x) => x.split(' ').map(Number));
let max = 0;
// 어떤 계란을 쳐서 깼을 때 가장 많은 계란이 깨지는지
// 모든 경우를 돌면서 비교해야 한다. 
function dfs(index) {
    // N일 때, 깨진 계란을 비교하기!
    if(index === N) {
        const brokenCount = eggs.filter(([power]) => power <= 0).length;
        max = Math.max(max, brokenCount);
        return;
    }

    // 손에 든 계란이 깨졌거나
    if(eggs[index][0] <= 0) {
        dfs(index + 1);
        return;
    }
    // 깨지지 않은 다른 계란이 없으면 넘어간다.
    let canHitAnotherEgg = false;
    for(let i = 0; i < N; i++) {
        if(i === index || eggs[i][0] <= 0) continue;

        // 칠 수 있는 계란이 있으므로 
        canHitAnotherEgg = true;

        // 내구도 변화
        eggs[index][0] -= eggs[i][1];
        eggs[i][0] -= eggs[index][1];

        dfs(index + 1); // 다음 계란으로 넘어가기

        // 내구도 복귀(백트래킹)
        eggs[index][0] += eggs[i][1];
        eggs[i][0] += eggs[index][1];
    }
    // 칠 수 있는 계란이 없는 경우
    if (!canHitAnotherEgg) {
        dfs(index + 1);
    }
}

dfs(0);
console.log(max);
