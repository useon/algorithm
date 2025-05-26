const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const T = Number(input[0]);
const info = input.slice(1).map(Number);

const gcd = (a, b) => b > 0 ? gcd(b, a % b) : a;

// 최대 N이 1000이니까 미리 answer 배열 만들기
const MAX = 1000;
const dp = Array(MAX + 1).fill(0);
dp[1] = 3;

for (let b = 2; b <= MAX; b++) {
    let count = 0;
    for (let a = 1; a < b; a++) {
        if (gcd(a, b) === 1) {
            count++;
        }
    }
    dp[b] = dp[b - 1] + count * 2;
}

// 테스트케이스에 대해 바로 출력
for (let i = 0; i < T; i++) {
    const N = info[i];
    console.log(dp[N]); 
}
