const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
// 배열에서 가장 작은 값을 출력하고, 그 값을 배열에서 제거
// 만약, 배열이 비어 있는 경우인데 가장 작은 값을 출력하라고 한 경우에는 0
const n = Number(input[0])
const commands = input.slice(1, 1 + n).map(Number);

const heap = [];

function makePush(value) {
    heap.push(value);
    heapifyUp(heap.length - 1);
}

function makePop() {
    if(heap.length === 0) return 0;
    if(heap.length === 1) return heap.pop();

    swap(0, heap.length - 1);
    const min = heap.pop();
    heapifyDown(0);

    return min;
}

function heapifyUp(index) {
    if(index === 0) return;
    let parent = Math.floor((index - 1) / 2);
    if(heap[index] < heap[parent]) {
        swap(index, parent);
        heapifyUp(parent);
    }
}

function heapifyDown(index) {
    let left = 2 * index + 1;
    let right = 2 * index + 2;
    let smallest = index;

    if(left < heap.length && heap[left] < heap[smallest]) smallest = left;
    if(right < heap.length && heap[right] < heap[smallest]) smallest = right;

    if(smallest !== index) {
        swap(index, smallest);
        heapifyDown(smallest);
    }
}

function swap(i, j) {
    [heap[i], heap[j]] = [heap[j], heap[i]];
}

const results = [];
for(let command of commands) {
    if(command === 0) {
        results.push(makePop())
    } else {
        makePush(command);
    }
}

console.log(results.join('\n'))
