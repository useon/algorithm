import sys
from collections import deque

# 함수 밖에서 입력 처리
input_lines = sys.stdin.read().splitlines()
n = int(input_lines[0])
balloons = list(map(int, input_lines[1].split()))
dq = deque() 
# 해당 deque를 만들어서 index와 이동해야할 거리 담기
for i in range(n):
    # 배열에서는 0부터 시작이지만 순서는 1번째라서
    dq.append([i + 1, balloons[i]])

result = []

# 풍선 터뜨리기
while dq:
    # 맨 처음을 터뜨리기
    order, number = dq.popleft()
    result.append(order)
    
    if number > 0:
        # 0보다 크면 전체적으로 수가 왼쪽 이동
        # rotate 안의 수가 음수
        dq.rotate(-(number - 1))
    else:
        # 0보다 작으면 전체적으로 수가 오른쪽 이동
        # rotate 안의 수가 양수
        dq.rotate(-number)

print(' '.join(map(str, result)))
