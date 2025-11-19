const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
const n = Number(input[0]);
const dist = input[1].split(' ').map(BigInt);      
const capitals = input[2].split(' ').map(BigInt);  
let index = 0;
let totalSum = 0n;

while (index < n - 1) {
  let a = index + 1;
  let count = dist[index];

  while (a < n - 1 && capitals[a] >= capitals[index]) {
    count += dist[a];
    a += 1;
  }

  totalSum += count * capitals[index];
  index = a;
}

console.log(totalSum.toString());
