const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../input.txt';
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim();
// 수빈 N, 동생 K
// 수빈은 걷거나(X-1, X+1) 순간이동(2*X)
const [N, K] = input.split(' ').map(Number);
const visited = Array.from({length: 100001}).fill(0);
const dx = [-1, 1, 2];
console.log(bfs(N));
function bfs(start) {
    const queue = [[start, 0]];
    visited[start] = true;

    while(queue.length > 0) {
        const [curX, curDist] = queue.shift();
            for(let i = 0; i < 3; i++) {
                if(curX === K) return curDist;
                let nextX = 0; 
                if(i === 2) {
                    nextX = 2 * curX;
                } else {
                    nextX = curX + dx[i];
                }
                if(nextX >= 0 && nextX <= 100000 && !visited[nextX]) {
                    queue.push([nextX, curDist + 1]);
                    visited[nextX] = true;
                }
            }
    }
}
