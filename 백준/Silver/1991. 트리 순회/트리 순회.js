const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input[0]);

const tree = new Map();

// 트리 구조를 만들자
for(let i = 1; i <= N; i++) {
    const [parent, left, right] = input[i].split(' ');
    tree.set(parent, {left: left, right: right});
}

// 각 순회 결과를 저장하기
let preorderResult = []; // 전위 순회
let inorderResult = []; // 중위 순회
let postorderResult = []; // 후위 순회

// 각 함수는 트리를 순회하는 것이기 때문에 재귀로 구성
// 순회마다 push 순서가 다르다 
// 전위: push->left노드로 재귀->right노드로 재귀
// 중위: left노드로 재귀->push->right노드로 재귀
// 후위: left노드로 재귀->right노드로 재귀->push

// 전위
function preorder(node){
    // 해당 노드가 비어있으면 리턴
    if(node === '.') {
        return;
    }
    preorderResult.push(node);
    // 해당 노드를 키로 가지고 있는 자식들 꺼내기
    const children = tree.get(node);
    preorder(children.left);
    preorder(children.right);
}

// 중위
function inorder(node) {
    if(node === '.') {
        return;
    }
    const children = tree.get(node);
    inorder(children.left);
    inorderResult.push(node);
    inorder(children.right);
}

// 후위
function postorder(node) {
    if(node === '.') {
        return;
    }
    const children = tree.get(node);
    postorder(children.left);
    postorder(children.right);
    postorderResult.push(node);
}

preorder('A');
inorder('A');
postorder('A');

console.log(preorderResult.join(''));
console.log(inorderResult.join(''));
console.log(postorderResult.join(''));
