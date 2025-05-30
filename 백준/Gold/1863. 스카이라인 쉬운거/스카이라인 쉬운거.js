const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input[0]);
const info = input.slice(1).map((x) => x.split(' ').map(Number));
const stack = [];
let count = 0;

for (let i = 0; i < N; i++) {
    const height = info[i][1];

    // 스택에 있는 높이보다 작아질 경우 이전 건물은 끝난 것이다.
    while (stack.length > 0 && stack[stack.length - 1] > height) {
        stack.pop();
        count++;
    }

    // 마지막 스택과 높이가 같으면 같은 건물로 간주.
    if (stack.length > 0 && stack[stack.length - 1] === height) continue;
    
    // 더 높은 경우만 다른 건물이므로 push
    if (height !== 0) stack.push(height);
}

// 스택에 남아 있는 것들은 각각의 건물이라고 볼 수 있기 때문에.
console.log(count += stack.length);
