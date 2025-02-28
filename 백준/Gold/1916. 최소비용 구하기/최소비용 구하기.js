const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
// 도시 N개
const N = Number(input[0]);
const M = Number(input[1]);
const busInfo = input.slice(2, M + 2).map((x) => x.split(' ').map(Number));
const [v1, v2] = input[M + 2].split(' ').map(Number);

// 그래프를 만들자
const graph = Array.from({ length: N + 1 }, () => []);
for(let i = 0; i < M; i++) {
    const [start, end, dist] = busInfo[i];
    graph[start].push([end, dist]);
}

const heap = [];
// 다익스트라 
function dijkstra(start) {
    const INF = Infinity;
    const dist = Array.from({ length: N + 1 }).fill(INF);

    makePush([0, start]); // [비용, 시작 정점]
    dist[start] = 0;

    // 최소 비용 갱신
    while(heap.length > 0) {
        const [curDist, curNode] = makePop();
        if(curDist > dist[curNode]) continue;
        for(const [nextNode, weight] of graph[curNode]) {
            const newDist = curDist + weight;
            if(newDist < dist[nextNode]) {
                dist[nextNode] = newDist;
                makePush([newDist, nextNode]);
            }
        }
    }
    return dist;
}

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
    const parent = Math.floor((index - 1) / 2);
    
    if(heap[parent][0] > heap[index][0]) {
         swap(parent, index);
         heapifyUp(parent);
    }
}

function heapifyDown(index) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
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

// 다익스트라 실행
const distResult = dijkstra(v1);
console.log(distResult[v2]);