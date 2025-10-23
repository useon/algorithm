import sys
from collections import deque

lines = sys.stdin.readline
n, m = map(int, lines().split()) # n:row, m=col
graph = [list(map(int, input().split())) for _ in range(n)]

dRow = [-1, 1, 0, 0]
dCol = [0, 0, -1, 1]
dist = [[-1 for _ in range(m)] for _ in range(n)]

# 목표 지점을 도출해서 해당 지점에서 한번의 BFS로 모든 거리 구하기
for i in range(n):
    for j in range(m):
        if graph[i][j] == 2:
            targetRow = i
            targetCol = j
            dist[i][j] = 0
        elif graph[i][j] == 0:
            dist[i][j] = 0

def bfs(startRow, startCol):
    queue = deque()
    queue.append([startRow, startCol])

    while queue:
        curRow, curCol = queue.popleft()

        for i in range(4):
            nextRow = curRow + dRow[i]
            nextCol = curCol + dCol[i]

            if 0 <= nextRow < n and 0 <= nextCol < m:
                if graph[nextRow][nextCol] != 0 and dist[nextRow][nextCol] == -1:
                    dist[nextRow][nextCol] = dist[curRow][curCol] + 1
                    queue.append([nextRow, nextCol])                

bfs(targetRow, targetCol)

for row in dist:
    print(*row)
