const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../input.txt';
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map((x) => x.trim());
const N = Number(input[0]);
const todo = input.slice(1).map((x) => x.split(' ').map(Number));
let result = 0; 
let width = 0;
let height = 0;
const check = Array(366).fill(0);

for(let i = 0; i < N; i++) {
    const [start, end] = todo[i];

    for(let j = start; j <= end; j++) {
        check[j] += 1;
    }
}

for(let k = 1; k <= 365; k++) {
    // 1부터 365까지 돌면서 카운트를 한다. 
    // 이때, maxWidth와 maxHeight를 갱신하는 방식.
    // 와! 1에서 365까지 쭉 있으면 0을 만날 수 없어서
    // 제대로 값이 도출되지 않는다.
    if(check[k] === 0) {
        result += width * height;
        width = 0;
        height = 0;
    } else {
        width += 1;
        height = Math.max(height, check[k]);
    }
}
// 한번 더 해준다. 안전하게.
result += width * height;

console.log(result);
