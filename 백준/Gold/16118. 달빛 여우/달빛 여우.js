const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const info = input.slice(1, M + 1).map((x) => x.split(' ').map(Number));

// 그래프 생성 (양방향)
const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < M; i++) {
    const [a, b, c] = info[i];
    graph[a].push([b, c]);
    graph[b].push([a, c]);
}

// 다익스트라 실행 (각각 분리)
const foxDist = dijkstraFox(1);
const wolfDist = dijkstraWolf(1);

// 여우가 더 빠른 경우의 개수 세기
let count = 0;
for (let i = 2; i <= N; i++) {
    const wolfMinDist = Math.min(wolfDist[i][0], wolfDist[i][1]); // 늑대의 최소 거리
    if (foxDist[i] < wolfMinDist) count++;
}

console.log(count);

// 여우의 다익스트라
function dijkstraFox(start) {
    const INF = Infinity;
    const dist = Array(N + 1).fill(INF);
    const heap = [];

    heap.push([0, start]);
    dist[start] = 0;

    while (heap.length > 0) {
        const [curDist, curNode] = makePop(heap);
        if (curDist > dist[curNode]) continue;

        for (const [nextNode, weight] of graph[curNode]) {
            const newDist = curDist + weight;
            if (newDist < dist[nextNode]) {
                dist[nextNode] = newDist;
                makePush(heap, [newDist, nextNode]);
            }
        }
    }
    return dist;
}

// 늑대의 다익스트라 (빠르게/느리게 구분)
function dijkstraWolf(start) {
    const INF = Infinity;
    const dist = Array.from({ length: N + 1 }, () => [INF, INF]); // [느리게 도착, 빠르게 도착]
    const heap = [];

		// 처음은 느림에서 시작한다. 왜? 지금은 시작 지점이기 때문에.
    heap.push([0, start, 0]); // (비용, 현재 노드, 현재 상태(0=느림, 1=빠름))
    dist[start][0] = 0;

    while (heap.length > 0) {
        const [curDist, curNode, curState] = makePop(heap);
        if (curDist > dist[curNode][curState]) continue;

        for (const [nextNode, weight] of graph[curNode]) {
		        // 왜 느림인데 / 2를 하는 것인가? 이전 상태를 기반으로 지금의 거리를 저장
		        // 즉, 지금은 빠르게 달리는 상태이기 때문에 / 2를 해주고 
            const newDist = curState === 0 ? curDist + weight / 2 : curDist + weight * 2;
            // 다음 상태를 현재를 기준으로 넣어 준다 ~ 
            const nextState = 1 - curState; // 번갈아 가면서 빠름 → 느림, 느림 → 빠름

            if (newDist < dist[nextNode][nextState]) {
                dist[nextNode][nextState] = newDist;
                makePush(heap, [newDist, nextNode, nextState]);
            }
        }
    }
    return dist;
}

// 최소 힙 구현 
function makePush(heap, value) {
    heap.push(value);
    heapifyUp(heap, heap.length - 1);
}

function makePop(heap) {
    if (heap.length === 0) return null;
    if (heap.length === 1) return heap.pop();

    swap(heap, 0, heap.length - 1);
    const min = heap.pop();
    heapifyDown(heap, 0);
    return min;
}

function heapifyUp(heap, index) {
    if (index === 0) return;
    const parent = Math.floor((index - 1) / 2);

    if (heap[parent][0] > heap[index][0]) {
        swap(heap, parent, index);
        heapifyUp(heap, parent);
    }
}

function heapifyDown(heap, index) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let smallest = index;

    if (left < heap.length && heap[left][0] < heap[smallest][0]) smallest = left;
    if (right < heap.length && heap[right][0] < heap[smallest][0]) smallest = right;

    if (index !== smallest) {
        swap(heap, index, smallest);
        heapifyDown(heap, smallest);
    }
}

function swap(heap, i, j) {
    [heap[i], heap[j]] = [heap[j], heap[i]];
}
