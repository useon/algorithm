const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
const info = input[0];

let maxResult = '';
let minResult = '';
let count = 0; 

for (let i = 0; i < info.length; i++) {
  const target = info[i];

  if (target === 'M') {
    count += 1;
  } else if (target === 'K') {
    // 최소값: 앞의 M들을 한 덩어리로 줄이기
    if (count > 0) {
      minResult += '1' + '0'.repeat(count - 1);
    }
    minResult += '5';

    // 최대값: 앞의 M들을 K와 합쳐서 크게 만들기
    if (count > 0) {
      maxResult += '5' + '0'.repeat(count);
    } else {
      maxResult += '5';
    }

    count = 0; 
  }
}

if (count > 0) {
  // 최대값: 남은 M들은 전부 1로 쪼갠다 
  maxResult += '1'.repeat(count);

  // 최소값: 남은 M들은 한 덩어리로 
  minResult += '1' + '0'.repeat(count - 1);
}

console.log(maxResult);
console.log(minResult);
