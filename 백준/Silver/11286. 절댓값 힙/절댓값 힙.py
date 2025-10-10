import sys
import heapq
input = sys.stdin.read().splitlines()
N = int(input[0])
info = input[1:]
pq = []

for i in info:
    target = int(i)
    absTarget = abs(target)
    if target == 0:
        if len(pq) == 0:
            print(0)
        else:
            print(heapq.heappop(pq)[1])
    else:
        heapq.heappush(pq, [absTarget, target])
