import sys
from collections import deque

lines = sys.stdin.read().splitlines()
n, m, v = map(int, lines[0].split())
connections = lines[1:1+m]
graph = list([] for i in range(0, n + 1))

# 그래프 만들기
for connection in connections:
    a, b = map(int, connection.split())
    graph[a].append(b)
    graph[b].append(a)

def dfs(start): # stack
    visited = []
    stack = []

    stack.append(start)
    
    while stack:
        node = stack.pop()

        # stack은 반대로 정렬(내림차순)을 해서 넣어줘야 된다.
        # 뒤에가 먼저 빠지기 때문에!
        if node not in visited:
            visited.append(node)
            sortedNodes = sorted(graph[node], reverse=True)
            stack.extend(sortedNodes)    
            
    return ' '.join(map(str, visited))

def bfs(start): # queue
    visited = []
    queue = deque()

    queue.append(start)
    
    while queue:
        node = queue.popleft()
        
        if node not in visited:
            visited.append(node)
            sortedNodes = sorted(graph[node])
            queue.extend(sortedNodes)

    return ' '.join(map(str, visited))

print(dfs(v))
print(bfs(v))
