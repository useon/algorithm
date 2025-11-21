const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
// -뒤를 크게 만들어야 함. 그러니까 -를 기준으로 쪼개자
const info = input[0].split('-')

// 각 덩어리끼리는 전부 합치기
for(let i = 0; i < info.length; i++) {
    info[i] = info[i].split('+').map(Number).reduce((a, b) => a + b)
}

// 이제 배열의 모든 원소를 -계산 해주기
const result = info.map(Number).reduce((a, b) => a - b)
console.log(result)
