const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

// 입력 파싱
const N = Number(input[0]);
const problems = input.slice(1, N + 1);
const M = Number(input[N + 1]);
const commands = input.slice(N + 2);

// 어려운 문제, 쉬운 문제 힙
const easyHeap = [];
const hardHeap = [];

// 삭제된 문제 추적
const removed = new Map();

function swap(heap, i, j) {
    [heap[i], heap[j]] = [heap[j], heap[i]];
}

function compareEasy(a, b) {
    // 문제 레벨이 낮은 순서로 정렬
    if (a[0] !== b[0]) return a[0] - b[0]; 
    // 레벨이 같은 경우 문제 번호가 낮은 순서로 정렬
    return a[1] - b[1];
}

function compareHard(a, b) {
    // 문제 레벨이 높은 순서로 정렬
    if (a[0] !== b[0]) return b[0] - a[0];
    // 레벨이 같은 경우는 문제 번호가 높은 순서로 정렬
    return b[1] - a[1];
}

function makePush(heap, value, compare) {
    heap.push(value);
    heapifyUp(heap, heap.length - 1, compare);
}

function makePop(heap, compare) {
    if (heap.length === 0) return null;
    if (heap.length === 1) return heap.pop();

    swap(heap, 0, heap.length - 1);
    const result = heap.pop();
    heapifyDown(heap, 0, compare);
    return result;
}

function heapifyUp(heap, index, compare) {
    if (index === 0) return;
    const parent = Math.floor((index - 1) / 2);
    if (compare(heap[index], heap[parent]) < 0) {
        swap(heap, index, parent);
        heapifyUp(heap, parent, compare);
    }
}

function heapifyDown(heap, index, compare) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let next = index;

    if (left < heap.length && compare(heap[left], heap[next]) < 0) next = left;
    if (right < heap.length && compare(heap[right], heap[next]) < 0) next = right;

    if (next !== index) {
        swap(heap, index, next);
        heapifyDown(heap, next, compare);
    }
}

// 가장 상위에 있는 것이 삭제된 것이면 배열에서 삭제
function cleanHeap(heap, compare) {
    while (heap.length > 0) {
        const [level, problem] = heap[0];
        const count = removed.get(problem) || 0;

        if (count > 0) {
            makePop(heap, compare);
            if (count === 1) {
                removed.delete(problem);
            } else {
                removed.set(problem, count - 1);
            }
        } else {
            break;
        }
    }
}

// 기존 문제
for (let i = 0; i < N; i++) {
    const [problem, level] = problems[i].split(' ').map(Number);
    makePush(easyHeap, [level, problem], compareEasy);
    makePush(hardHeap, [level, problem], compareHard);
}

// 명령 실행
for (let i = 0; i < M; i++) {
    const [cmd, a, b] = commands[i].split(' ');

    if (cmd === 'add') {
        const addProblem = Number(a);
        const addLevel = Number(b);
        makePush(easyHeap, [addLevel, addProblem], compareEasy);
        makePush(hardHeap, [addLevel, addProblem], compareHard);
    } else if (cmd === 'recommend') {
        const x = Number(a);
        if (x === 1) {
            cleanHeap(hardHeap, compareHard);
            console.log(hardHeap[0][1]);
        } else {
            cleanHeap(easyHeap, compareEasy);
            console.log(easyHeap[0][1]);
        }
    } else if (cmd === 'solved') {
        const problem = Number(a);
        // 상위가 아니여서 배열에서 아직 삭제를 못 했는데
        // 또 들어오는 경우가 있을 수 있으니 덮으면 안되고 카운트로 관리
        if (removed.has(problem)) {
            removed.set(problem, removed.get(problem) + 1);
        } else {
            removed.set(problem, 1);
        }
    }
}
