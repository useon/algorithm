const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const result = []

for(let i = 0; i < input.length; i++) {
    const [s, t] = input[i].split(' ')
    let sPointer = 0
    let tPointer = 0

    while(sPointer < s.length && tPointer < t.length) {
        if(s[sPointer] === t[tPointer]) sPointer += 1
        tPointer += 1
    }

    result.push(sPointer === s.length ? 'Yes' : 'No')
}

console.log(result.join('\n'))
