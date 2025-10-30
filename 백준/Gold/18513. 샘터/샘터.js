const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, k] = input[0].split(' ').map(Number)
const spring = input[1].split(' ').map(Number)
const visited = new Set()
const dRow = [-1, 1]

function bfs(springs) {
    const queue = [...springs]
    let index = 0
    let makeHome = 0
    let sum = 0

    while(queue.length > index) {
        const [nearSpring, curPoint] = queue[index]

        for(let i = 0; i < 2; i++) {
            const nextPoint = curPoint + dRow[i]

            if(!visited.has(nextPoint)) {
                visited.add(nextPoint)
                queue.push([nearSpring, nextPoint])
                makeHome += 1
                sum += Math.abs(nearSpring - nextPoint)

                if(makeHome === k) return sum  
            }
        }       
        index += 1
    }
}

function solve() {
    const start = []

    for(let i = 0; i < n; i++) {
        const point = spring[i]
        visited.add(point)
        start.push([spring[i], spring[i]])
    }
    return bfs(start)
}

console.log(solve())
