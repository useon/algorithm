const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input[0]);
const M = Number(input[1]);
// 최소비용1랑 달라진 점은 그냥 최소 비용만 저장하는 것이 아님
// 경로를 방문하는 도시 순서대로 출력한다.
const busInfo = input.slice(2, M + 2).map((x) => x.split(' ').map(Number));
const [v1, v2] = input[M + 2].split(' ').map(Number);
const heap = [];

// 그래프를 만들자
const graph = Array.from({ length: N + 1 }, () => []);
for(let i = 0; i < M; i++) {
    const [start, end, weight] = busInfo[i];

    graph[start].push([end, weight]);
}

// 다익스트라 실행
const [dist, prev] = dijkstra(v1);
console.log(dist[v2]);
const visitedPath = getPath(v1, v2, prev);
console.log(visitedPath.length);
console.log(visitedPath.join(' '));

// 다익스트라
function dijkstra(start) {
    const INF = Infinity;
    // 거리랑 방문 노드들을 넣어야 한다. 
    const dist = Array.from({ length: N + 1 }).fill(INF);
    const prev = Array(N + 1).fill(-1);    
    dist[start] = 0;
    makePush([0, start]); // [비용, 정점]
    while(heap.length > 0) {
        const [curDist, curNode] = makePop();
        if(curDist > dist[curNode]) continue;
        for(const [nextNode, weight] of graph[curNode]) {
            const newDist = curDist + weight;
            if(newDist < dist[nextNode]) {
                dist[nextNode] = newDist;
                // 이전 경로를 저장해두자!!!!
                prev[nextNode] = curNode;
                makePush([newDist, nextNode]);
            }
        }
    }
    return [dist, prev];
}

// 경로 구하기
function getPath(start, end, prev) {
    const path = [];
    let node = end;

    while (node !== -1) { // 출발 노드까지 역추적
        path.push(node);
        node = prev[node];
    }
    return path.reverse(); // 역순이므로 뒤집기
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

    if(index !== smallest) {
        swap(index, smallest);
        heapifyDown(smallest);
    }
}

function swap(i, j) {
    [heap[i], heap[j]] = [heap[j], heap[i]];
}