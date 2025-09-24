import sys
from collections import deque
input_lines = sys.stdin.read().splitlines()
N, K = map(int, input_lines[0].split())

# 앞에서 빼야 하므로 deque를 사용한다.
queue = deque()
result = []

# 일단 N까지 queue를 채운다.

for i in range(1, N + 1):
    queue.append(i)

# queue가 빌 때까지 반복해야 한다.
while queue:
    for j in range(0, K - 1):
        queue.append(queue.popleft())
    result.append(queue.popleft())

# f-string을 감싸는 외부 따옴표와 내부 문자열에 사용된 따옴표가 겹치지 않도록 주의
print(f'<{", ".join(map(str, result))}>')
