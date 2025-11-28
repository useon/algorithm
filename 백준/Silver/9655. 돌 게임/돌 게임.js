const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
const n = Number(input[0])

if(n % 2 === 0) {
    console.log('CY')
} else {
    console.log('SK')
}
