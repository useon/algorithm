const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
const n = Number(input[0])
const info = input[1].split(' ').map(BigInt).sort((a, b) => (a < b ? -1 : 1));

let result = 0
// 짝수냐 홀수냐에 따라 다르다.
const isEven = info.length % 2 === 0 ? true : false

if(isEven) {
   for(let i = 0; i < Math.floor(n / 2); i++) {
       if(result < info[i] + info[n - i - 1]) {
           result = info[i] + info[n - i - 1]
       }
   }
} else {
    const arr = info.slice(0, n - 1)
    const k = arr.length
    for(let i = 0; i < Math.floor(k / 2); i++) {
        if(result < arr[i] + arr[k - i - 1]) {
            result = arr[i] + arr[k - i - 1]
        }
    }
    if(result < info[n - 1]) {
        result = info[n - 1]
    }
}

console.log(String(result))
