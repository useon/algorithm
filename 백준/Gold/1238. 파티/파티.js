const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M, X] = input[0].split(' ').map(Number);
const info = input.slice(1, M + 1).map((x) => x.split(' ').map(Number));

// 그래프
const graph = Array.from({length:N+1}, () => []);
for(let i = 0; i < info.length; i++) {
    const [a, b, cost] = info[i];
    graph[a].push([b, cost]);
}


// 다익스트라 실행
// 각 정점에서 X번까지 가는 최단 경로 중 가장 많은 거
const heap = [];
const totalDist = Array.from({ length: N + 1 }).fill(0);
for(let i = 1; i <= N; i++) {
    const dists = dijkstra(i);
    totalDist[i] = dists[X];
}

// 2번에서 각 정점으로 가는 최단 경로 중 가장 많은 거
const xToN = dijkstra(X);
for(let i = 1; i <= N; i++) {
    totalDist[i] += xToN[i];
}
console.log(Math.max(...totalDist));

function dijkstra(start) {
    const INF = Infinity;
    const dist = Array.from({length: N + 1}).fill(INF);
    makePush([0, start]);
    dist[start] = 0;
    
    while(heap.length > 0) {
        const [curDist, curNode] = makePop();
        if(curDist < dist[curNode]) continue;
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

    if(left < heap.length && heap[left][0] < heap[index][0]) smallest = left;
    if(right < heap.length && heap[right][0] < heap[index][1]) smallest = right;

    if(index !== smallest) {
        swap(index, smallest);
        heapifyDown(smallest);
    }
}

function swap(i, j) {
    [heap[i], heap[j]] = [heap[j], heap[i]]
}