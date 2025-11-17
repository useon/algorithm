const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
const n = Number(input[0])
const info = input.slice(1).sort((a, b) => Number(b) - Number(a))

let count = 0
let index = 0
while(info.length > index) {
    const arr = info.slice(index, index + 3)
    if(arr.length === 1) {
        count += Number(arr[0])
    } else {
        count += Number(arr[0]) + Number(arr[1])
    }
    index += 3
}

console.log(count)
