import sys
import heapq
n = int(sys.stdin.readline())
pq = []

# 입력을 한번에 받지 않고 한줄씩 받는 방법
# 하나하나 원소를 비교해서 넣는 방법 n^2
for i in range(0, n):
    nums = list(map(int, sys.stdin.readline().split()))
    for num in nums:
        # 크기를 딱 n만큼만 만들어서 
        if len(pq) == n:
            # 최소힙으로 정렬되어 있는 상태
            # 이 배열에서 가장 작은 원소랑 비교
            # 현재 num이 최소값보다 더 크다면 교체
            if pq[0] < num:
                heapq.heappop(pq)
                heapq.heappush(pq, num)
        else:
            heapq.heappush(pq, num)

print(heapq.heappop(pq))
