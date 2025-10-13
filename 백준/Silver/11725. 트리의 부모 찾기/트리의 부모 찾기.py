import sys
from collections import deque

input = sys.stdin.read().splitlines()
N = int(input[0]) 
info = input[1:]
graph = list([] for _ in range(N + 1))
queue = deque([1])
parent = [0] * (N + 1) # parent[i]는 i의 부모, 0이면 미방문

# 인접리스트 만들기
for value in info:
    a, b = list(map(int, value.split()))
    graph[a].append(b)
    graph[b].append(a)

parent[1] = -1 # 루트 1은 부모 없음

# bfs
while queue:
    node = queue.popleft()

    for v in graph[node]:
        if parent[v] == 0: # 미방문
            parent[v] = node # v의 부모는 node
            queue.append(v)

result = []

for i in range(2, N + 1):
    result.append(str(parent[i]))

print("\n".join(result))   
