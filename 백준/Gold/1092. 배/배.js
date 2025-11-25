const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function solve() {
  const N = Number(input[0]);
  const cranes = input[1].split(' ').map(Number);
  const M = Number(input[2]);
  const boxes = input[3].split(' ').map(Number);

  cranes.sort((a, b) => b - a);
  boxes.sort((a, b) => b - a);

  if (boxes[0] > cranes[0]) {
    console.log(-1);
    return; 
  }

  let time = 0;
  let moved = 0;

  const used = Array(M).fill(false);
  const idx = Array(N).fill(0);

  while (moved < M) {
    time++;

    for (let i = 0; i < N; i++) {
      while (
        idx[i] < M && 
        (used[idx[i]] || boxes[idx[i]] > cranes[i])
      ) {
        idx[i]++;
      }

      if (idx[i] < M) {
        used[idx[i]] = true;
        idx[i]++; 
        moved++;
      }
    }
  }

  console.log(time);
}

solve();
