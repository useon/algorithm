const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input[0]);
const info = input.slice(1).map(Number);

const heap = [];

for (let x of info) {
    if (x !== 0) {
        makePush(x);
    } else {
        console.log(makePop());
    }
}

function makePush(value) {
    // [절댓값, 원래 값]
    heap.push([Math.abs(value), value]);  
    heapifyUp(heap.length - 1);
}

function makePop() {
    // 비어있을 때 0
    if (heap.length === 0) return 0; 
    if (heap.length === 1) return heap.pop()[1];

    swap(0, heap.length - 1);
    const min = heap.pop();
    heapifyDown(0);
    return min[1];
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

    // 정렬하면서 바로 절대값이 같은 경우 정렬까지 같이 해버리기
    // compare(a, b) < 0 => a가 b보다 작니?를 의미함
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
    // 절댓값 비교
    if (a[0] !== b[0]) return a[0] - b[0];
    // 절댓값 같으면 실제 값 비교
    return a[1] - b[1];                    
}

function swap(i, j) {
    [heap[i], heap[j]] = [heap[j], heap[i]];
}
