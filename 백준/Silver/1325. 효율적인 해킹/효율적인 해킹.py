import sys
from collections import deque

lines = sys.stdin.readline
n, m = map(int, lines().split())

# 신뢰할 수 있는 연결로 이루어진 그래프 만들기
# A가 B를 신뢰한다. B를 해킹하면 A를 해킹할 수 있다.
# 양방향 그래프가 아니라 단방향 그래프이다!
graph = [[] for _ in range(n + 1)]

for _ in range(m):
    a, b = map(int, lines().split())
    graph[b].append(a)

def bfs(start):
    visited = [0] * (n + 1)
    queue = deque()
    queue.append(start)
    visited[start] = 1
    count = 0
    
    while queue:
        cur_computer = queue.popleft()

        for next in graph[cur_computer]:
            if visited[next] == 0:
                visited[next] = 1
                queue.append(next)
                count += 1
                
    return count


# 어느 컴퓨터 번호로 시작할 때 가장 많은 해킹이 이루어지는지
# 방문하지 않은 해당 컴퓨터 번호를 전부 돌아가면서 값 도출
def solve():
    computer_numbers = []
    max_count = 0

    for i in range(1, n + 1):
        count = bfs(i)
        
        if count > max_count:
            computer_numbers = []
            computer_numbers.append(i)
            max_count = count
        elif count == max_count:
            computer_numbers.append(i)

    computer_numbers.sort()
    return ' '.join(map(str, computer_numbers))

print(solve())
        