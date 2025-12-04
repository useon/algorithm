const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const lectures = [];

for (let i = 1; i <= N; i++) {
  const [s, e] = input[i].split(' ').map(Number);
  lectures.push([s, e]);
}

lectures.sort((a, b) => {
  if (a[0] === b[0]) return a[1] - b[1];
  return a[0] - b[0];
});

const heap = [];

function makePush(value) {
  heap.push(value);
  heapifyUp(heap.length - 1);
}

function makePop() {
  if (heap.length === 0) return null;
  if (heap.length === 1) return heap.pop();

  swap(0, heap.length - 1);
  const min = heap.pop();
  heapifyDown(0);
  return min;
}

function heapifyUp(index) {
  if (index === 0) return;
  const parent = Math.floor((index - 1) / 2);
  if (compare(heap[index], heap[parent]) < 0) {
    swap(index, parent);
    heapifyUp(parent);
  }
}

function heapifyDown(index) {
  const left = 2 * index + 1;
  const right = 2 * index + 2;
  let smallest = index;

  if (left < heap.length && compare(heap[left], heap[smallest]) < 0) {
    smallest = left;
  }

  if (right < heap.length && compare(heap[right], heap[smallest]) < 0) {
    smallest = right;
  }

  if (smallest !== index) {
    swap(index, smallest);
    heapifyDown(smallest);
  }
}

function compare(a, b) {
  return a - b;
}

function swap(i, j) {
  [heap[i], heap[j]] = [heap[j], heap[i]];
}

for (let i = 0; i < N; i++) {
  const [start, end] = lectures[i];

  if (heap.length > 0 && heap[0] <= start) {
    makePop();
  }

  makePush(end);
}

console.log(heap.length);
