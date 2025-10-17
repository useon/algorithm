import sys
from collections import deque

input = sys.stdin.read().splitlines()
n = int(input[0])
pairNum = int(input[1])
graph = list([] for i in range(0, n+1))
visited = list(False for i in range(0, n+1))
queue = deque()

# graph 채우기
for i in range(2, 2 + pairNum):
    a, b = map(int, input[i].split())
    graph[a].append(b)
    graph[b].append(a)

# BFS 돌면서 바이러스 걸린 컴퓨터 수 카운트하기
def BFS(start):
    visited[start] = True
    queue.append(start)
    count = 0

    while queue:
        curQ = queue.popleft()
        for next in graph[curQ]:
            if visited[next] == False:
                count += 1
                visited[next] = True
                queue.append(next)
    return count

print(BFS(1))
