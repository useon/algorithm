import sys
from collections import deque
input_lines = sys.stdin.read().splitlines()
N = int(input_lines[0])

# 앞에서 빼야 하므로 deque를 사용한다.
queue = deque()

# 큐에 값 넣기
for i in range(1, N + 1):
    queue.append(i)

# 주어진 조건에 맞춰서 queue의 길이가 1이 될 때까지
while len(queue) > 1:
    # 가장 앞에 있는 것 버린다. 
    queue.popleft()
    # 이제 가장 앞에 있는 것을 가장 뒤에 넣는다.
    queue.append(queue.popleft())

print(queue.popleft())
