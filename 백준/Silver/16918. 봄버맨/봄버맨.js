const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
// R: 6줄, C: 7칸, N: 초
const [R, C, N] = input[0].split(' ').map(Number)
const info = input.slice(1, 1 + R).map((x) => x.replaceAll('O', 0));
const graph = info.map((x) => x.split(''))
const direction = [[-1, 0], [1, 0], [0, -1], [0, 1], [0, 0]];

for(let i = 2; i <= N; i++) {
    // 설치
    if(i % 2 === 0) {
        installBoomb(i);
    } else {
        // 폭탄 찾기
        findBoom(i);
    }
}

function installBoomb(seconds) {
    for(let i = 0; i < R; i++) {
        for(let j = 0; j < C; j++) {
            if(graph[i][j] === '.') {
                graph[i][j] = seconds;
            }
        }
    }
}

function findBoom(seconds) {
    const booms = [];
    for(let i = 0; i < R; i++) {
        for(let j = 0; j < C; j++) {
            if(seconds - Number(graph[i][j]) === 3) {
                direction.forEach((e) => {
                    const [x, y] = e;
                    const [curX, curY] = [i + x, j + y];
                    if(curX >= 0 && curX < R && curY >= 0 && curY < C) {
                        booms.push([curX, curY]);
                    }
                })
            }
        }
    }
    boom(booms);
}

function boom(booms) {
    booms.forEach((e) => {
        const [x, y] = e;
        graph[x][y] = '.'
    })
}

graph.forEach((row) => {
    for(let q = 0; q < C; q++) {
        if(row[q] !== '.') {
            row[q] = 'O';
        }
    }
    console.log(row.join(''));
});