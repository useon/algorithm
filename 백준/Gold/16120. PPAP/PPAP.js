const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../input.txt';
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim();

// PPAP -> P
// 문제의 조건을 잘 읽어보자.
// 너무 복잡해 지지 말자 !!!
let str = input
const stack = [];

for(let i = 0; i < input.length; i++) {
    stack.push(input[i]);

    if(stack.length >= 4) {
        if(stack[stack.length - 1] === 'P' &&
           stack[stack.length - 2] === 'A' &&
           stack[stack.length - 3] === 'P' &&
           stack[stack.length - 4] === 'P'
          ) {
            stack.splice(stack.length - 4, 4, 'P');
          }
    }
}

if(stack.length === 1 && stack[0] === 'P') {
    console.log('PPAP');
} else {
    console.log('NP');
}
