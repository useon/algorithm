const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, S] = input[0].split(' ').map(Number);
const nums = input[1].split(' ').map(Number);
// 합이 S가 되는 부분수열의 개수
let count = 0;

function dfs(index, sum) {
    // 종료조건
    if(index === N) {
        if(sum === S) count++;
        return;
    }

    // 해당 원소를 고르냐 
    dfs(index + 1, sum + nums[index]);

    // 해당 원소를 안고르냐
    dfs(index + 1, sum);
}

dfs(0, 0);
// 아무것도 선택하지 않은 경우도 포함되어 있어서
// 그런 경우 제외를 해줘야 함.
if(S === 0) count--
console.log(count);
