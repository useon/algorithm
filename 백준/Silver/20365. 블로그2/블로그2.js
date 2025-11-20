const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
const n = Number(input[0]);
const s = input[1].trim();

let rGroup = 0;
let bGroup = 0;
let prev = null;

for (let i = 0; i < n; i++) {
  const cur = s[i];
  if (cur !== prev) {
    if (cur === 'R') rGroup++;
    else if (cur === 'B') bGroup++;
    prev = cur;
  }
}

const answer = 1 + Math.min(rGroup, bGroup);
console.log(answer);
