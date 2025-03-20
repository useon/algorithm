const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, K] = input[0].split(' ').map(Number);
const info = input[1].split(' ').map(Number);

let checkedNumbers = new Map();
let left = 0;
let right = 0;
let result = 0; // result를 -Infinity가 아닌 0으로 초기화

while (right < N) {
    let num = info[right];

    // 현재 숫자의 개수를 1 증가
    checkedNumbers.set(num, (checkedNumbers.get(num) || 0) + 1);

    // 현재 숫자가 K를 초과하면 left 이동
    while (checkedNumbers.get(num) > K) {
        checkedNumbers.set(info[left], checkedNumbers.get(info[left]) - 1);
        left += 1;
    }

    // 최대 길이 갱신
    result = Math.max(result, right - left + 1);

    right += 1;
}

console.log(result);
