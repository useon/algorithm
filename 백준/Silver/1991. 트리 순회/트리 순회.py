import sys
import heapq

lines = sys.stdin.read().splitlines()
n = int(lines[0])
tree = {}
for i in range(1, n+1):
    parent, left, right = lines[i].split()
    tree[parent] = {'left': left, 'right': right}

# 전위: push -> left 노드 재귀 -> right 노드 재귀
# 중위: left 노드 제귀 -> push -> right 노드 재귀
# 후위: left 노드 재귀 -> right 노드 재귀 -> push
preorderResult = []
inorderResult = []
postorderResult = []

def preorder(node):
    if node == '.':
        return
    preorderResult.append(node)
    children = tree[node]
    preorder(children['left'])
    preorder(children['right'])

def inorder(node):
    if node =='.':
        return
    children = tree[node]
    inorder(children['left'])
    inorderResult.append(node)
    inorder(children['right'])

def postorder(node):
    if node == '.':
        return
    children = tree[node]
    postorder(children['left'])
    postorder(children['right'])
    postorderResult.append(node)

preorder('A')
inorder('A')
postorder('A')

print(''.join(preorderResult))
print(''.join(inorderResult))
print(''.join(postorderResult))
