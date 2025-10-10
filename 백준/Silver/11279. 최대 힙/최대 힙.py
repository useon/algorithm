import sys
import heapq
input = sys.stdin.read().splitlines()
N = int(input[0])
info = input[1:]
# x가 자연수면 배열에 추가
# x가 0이면 배열에서 가장 큰 값 출력 및 제거
pq = []

for i in info:
    target = int(i)
    if target == 0:
        if len(pq) == 0:
            print(0)
        else:
            print(-heapq.heappop(pq))
    else:
        heapq.heappush(pq, -target)
        