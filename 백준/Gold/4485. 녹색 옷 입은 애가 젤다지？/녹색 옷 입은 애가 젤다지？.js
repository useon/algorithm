const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

// 다중 테스트 케이스 처리
let index = 0;
let testCase = 1;
const results = [];
const heap = [];

while(index < input.length) {
    const N = Number(input[index]); // NxN 크기의 그래프
    if(N === 0) break; // 0이면 종료

    // 그래프 입력 처리
    const graph = [];
    for(let i = 0; i < N; i++) {
        graph.push(input[index + 1 + i].split(' ').map(Number));
    }

		// 다익스트라 실행
    const minCost = dijkstra(N, graph);
    results.push(`Problem ${testCase}: ${minCost}`);

    // 다음 테스트 케이스로 이동
    index += N + 1;
    testCase++;
}

// 최소힙
function makePush(value) {
    heap.push(value);
    heapifyUp(heap.length - 1);
}

function makePop() {
    if(heap.length === 0) return;
    if(heap.length === 1) return heap.pop();

    swap(0, heap.length - 1);
    const min = heap.pop();
    heapifyDown(0);
    return min;
}

function heapifyUp(index) {
    if(index === 0) return;
    let parent = Math.floor(index - 1 / 2);
    if(heap[index][0] < heap[parent][0]) {
        swap(parent, index);
        heapifyUp(parent);
    }
}

function heapifyDown(index) {
    let left = 2 * index + 1;
    let right = 2 * index + 2;

    let smallest = index;
    if(left < heap.length && heap[left][0] < heap[smallest][0]) smallest = left;
    if(right < heap.length && heap[right][0] < heap[smallest][0]) smallest = right;

    if(smallest !== index) {
        swap(index, smallest);
        heapifyDown(smallest);
    }
    
}

function swap(i, j) {
    [heap[i], heap[j]] = [heap[j], heap[i]];
}


function dijkstra(N, graph) {
    const INF = Infinity;
    const roopy = Array.from({ length: N }, () => Array(N).fill(INF));
    roopy[0][0] = graph[0][0];

    // 어떤 형식으로 저장할 것인가? [비용, x, y]
    makePush([graph[0][0], 0, 0]) 
    
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    while(heap.length > 0) {
        const [curCost, x, y] = makePop();

        if(curCost > roopy[x][y]) continue;

        for(let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            if(nx >= 0 && nx < N && ny >= 0 && ny < N) {
                const newCost = curCost + graph[nx][ny];

                if(newCost < roopy[nx][ny]) {
                    roopy[nx][ny] = newCost;
                    makePush([newCost, nx, ny]);
                }
            }
        }
    }
    return roopy[N - 1][N -1];
}

console.log(results.join('\n'));
