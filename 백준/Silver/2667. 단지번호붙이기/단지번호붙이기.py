import sys
from collections import deque

lines = sys.stdin.readline
n = int(lines())
graph = []
visited = [[False for _ in range(n)] for _ in range(n)]
dRow = [-1, 1, 0, 0]
dCol = [0, 0, -1, 1]

# 그래프 만들기
for _ in range(n):
    line = list(map(int, lines().strip()))
    graph.append(line)

# bfs
def bfs(startRow, startCol):
    queue = deque()
    queue.append([startRow, startCol])
    visited[startRow][startCol] = True
    count = 1
    
    while queue:
        curRow, curCol = queue.popleft()

        for i in range(4):
            nextRow = curRow + dRow[i]
            nextCol = curCol + dCol[i]

            if 0 <= nextRow < n and 0 <= nextCol < n and graph[nextRow][nextCol] == 1 and visited[nextRow][nextCol] == False:
                visited[nextRow][nextCol] = True
                queue.append([nextRow, nextCol])
                count += 1

    return count

result = []

for i in range(n):
    for j in range(n):
        if visited[i][j] == False and graph[i][j] == 1:
            result.append(bfs(i, j))

print(len(result))
print('\n'.join(list(map(str, sorted(result)))))
