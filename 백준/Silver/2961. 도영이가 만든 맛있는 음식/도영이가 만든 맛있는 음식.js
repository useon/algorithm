const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input[0]);
const info = input.slice(1).map((x) => x.split(' ').map(Number));

// 재귀! 해당 맛을 선택하거나 안 하거나.
let minDiff = Infinity;

// 선택 개수가 필요한 이유는 무조건 1개는 선택하기 때문에. 
function dfs(index, s, b, count) {
    // 재귀 탈출 조건 index가 N까지 ~~
    if(index === N) {
        if(count > 0) {
            const diff = Math.abs(s - b);
            minDiff = Math.min(diff, minDiff);
        }
        return;
    }

    const [sCount, bCount] = info[index];
    // 현재 재료를 선택하는 경우
    dfs(index + 1, s * sCount, b + bCount, count + 1);

    // 현재 재료를 선택하지 않는 경우
    dfs(index + 1, s, b, count);
}

dfs(0, 1, 0, 0);

console.log(minDiff);
