const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
const [a, b] = input[0].split(' ').map(Number)
const queue = [[a, 0]]
let index = 0
let minCount = Infinity
while(queue.length > index) {
    const [cur, count] = queue[index++]
    if(cur === b) {
        minCount = Math.min(minCount, count)
    }

    if(cur * 2 <= b) {
        queue.push([cur * 2, count + 1])
    } 
    
    if(Number(String(cur) + '1') <= b) {
        queue.push([Number(String(cur) + '1'), count + 1])
    }
}

console.log(minCount === Infinity ? -1 : minCount + 1)
