import sys
from collections import deque

lines = sys.stdin.readline
n, m = map(int,lines().split())
graph = [[0 for _ in range(m+1)]]
visited = [[False for _ in range(m+1)] for _ in range(n+1)]
dRow = [-1, 1, 0, 0]
dCol = [0, 0, -1, 1]

# 그래프 만들기
for _ in range(n):
    line = [0, *list(map(int, lines().strip()))]
    graph.append(line)

# bfs
def bfs(startRow, startCol, endRow, endCol):
    queue = deque()
    visited[startRow][startCol] = True
    queue.append([startRow, startCol, 1])
    arrivedCount = []
    
    while queue:
        curRow, curCol, curDist = queue.popleft()

        for i in range(4):
            nextRow = curRow + dRow[i]
            nextCol = curCol + dCol[i]
            nextDist = curDist + 1

            if 0 < nextRow <= n and 0 < nextCol <= m and visited[nextRow][nextCol] == False and graph[nextRow][nextCol] == 1:
                if nextRow == n and nextCol == m:
                    arrivedCount.append(nextDist)
                else:
                    visited[nextRow][nextCol] = True
                    queue.append([nextRow, nextCol, nextDist])
    return sorted(arrivedCount)[0] 

print(bfs(1, 1, n, m))
