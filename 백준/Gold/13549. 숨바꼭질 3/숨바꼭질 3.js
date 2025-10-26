const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);

function bfs(start) {
    const queue = []
    const visited = new Set()
    let index = 0
    let ealryTime = Infinity

    queue.push([start, 0])

    while(queue.length > index) {
        const [curPosition, curTime] = queue[index]

        if(curPosition === m) {
            ealryTime = Math.min(ealryTime, curTime)
        }
        
        if(curPosition * 2 >= 0 && curPosition * 2 <= 100000 && !visited.has(curPosition * 2)){
            queue.push([curPosition * 2, curTime])
            visited.add(curPosition * 2)
        } 
        if(curPosition - 1 >= 0 && curPosition - 1 <= 100000 && !visited.has(curPosition - 1)){
            queue.push([curPosition - 1, curTime + 1])
        }
        if(curPosition + 1 >= 0 && curPosition + 1 <= 100000 && !visited.has(curPosition + 1)){
            queue.push([curPosition + 1, curTime + 1])
        } 
        visited.add(curPosition - 1)
        visited.add(curPosition + 1)
        index += 1
    }
    return ealryTime
}

console.log(bfs(n))
