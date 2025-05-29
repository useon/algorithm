const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const info = input.slice(1).map((x) => x.split(' ').map(Number));
const graph = Array.from({ length: N + 1 }, () => []);

// 1. 양방향 그래프 만들기
for(let i = 0; i < M; i++) {
    const [a, b, weight] = info[i];
    graph[a].push([b, weight]);
    graph[b].push([a, weight]);
}

const heap = [];
// 2. start 지점 1로 잡고 다익스트라
function dijkstra(start) {
    const INF = Infinity;
    const dist = Array(N + 1).fill(INF);
    dist[start] = 0;

    makePush([0, start]);

    while(heap.length > 0) {
        const [curDist, curNode] = makePop();
        if(curDist > dist[curNode]) continue;

        for(const [nextNode, nextDist] of graph[curNode]) {
            const newDist = curDist + nextDist;

            if(newDist < dist[nextNode]) {
                dist[nextNode] = newDist;
                makePush([newDist, nextNode]);
            }
        }
    }
    return dist[N];
}

// 3. 우선순위 큐
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

console.log(dijkstra(1));
