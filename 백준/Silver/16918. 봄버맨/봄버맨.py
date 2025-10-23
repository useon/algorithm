import sys
from collections import deque

lines = sys.stdin.readline
r, c, n = map(int, lines().split())
graph = [list(*input().split()) for _ in range(r)]
boomMap = [[-1 for _ in range(c)] for _ in range(r)]

# 폭탄 설치 함수
def installBoom(t):
    installPosition = set()

    # 설치 위치 찾기
    for i in range(r):
        for j in range(c):
            if boomMap[i][j] == -1:
                installPosition.add((i, j))
    # 한번에 설치
    for installRow, installCol in installPosition:
        boomMap[installRow][installCol] = t
        graph[installRow][installCol] = 'O'

# 폭탄 터뜨리기 함수
def boom(t):
    dRow = [-1, 1, 0, 0]
    dCol = [0, 0, -1, 1]
    boomPosition = set()

    # 터뜨릴 위치 모으기
    for i in range(r):
        for j in range(c):
            if boomMap[i][j] == t - 3:
                boomPosition.add((i, j))
                for k in range(4):
                    nextRow = i + dRow[k]
                    nextCol = j + dCol[k]

                    if 0 <= nextRow < r and 0 <= nextCol < c:
                        boomPosition.add((nextRow, nextCol))

    # 터뜨리기
    for boomRow, boomCol in boomPosition:
        boomMap[boomRow][boomCol] = -1
        graph[boomRow][boomCol] = '.'

# 폭탄이 설치된 부분을 처음에 설치되는 0초 세팅
for i in range(r):
    for j in range(c):
        if graph[i][j] == 'O':
            boomMap[i][j] = 0
    
# 짝수초에 설치 홀수초에 터짐
for t in range(1, n+1):
    # 만약 헌재 짝수 초면 현재 시간으로 폭탄 설치
    if t % 2 == 0:
        installBoom(t)
    # 만약 현재 홀수 초면 현재 시간인 폭탄 터뜨리기
    else:
        boom(t)

for row in graph:
    print(''.join(row))
                