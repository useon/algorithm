const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input[0]);
const schedule = input.slice(1).map((x) => x.split(' ').map(Number));

let maxProfit = 0;

function backtrack(day, sum) {
    // 퇴사일 넘어가면 X
    if(day > N) return;
    maxProfit = Math.max(maxProfit, sum);

    for(let i = day; i < N; i++) {
        const [t, p] = schedule[i];
        backtrack(i + t, sum + p);
    }
}

backtrack(0, 0);
console.log(maxProfit);
