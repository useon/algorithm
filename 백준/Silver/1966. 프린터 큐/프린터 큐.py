import sys
input = sys.stdin.read().splitlines()
from collections import deque
n = int(input[0])
info = input[1:]

for i in range(0, len(info), 2):
    N, M = map(int, info[i].split())
    arr = list(map(int, info[i + 1].split()))
    # (순서 - 0부터 시작, 중요도)
    papers = deque((j, arr[j]) for j in range(N))

    while papers: 
        paper = papers.popleft()
        order = paper[0]
        importance = paper[1]
    
        largeNumbers = [paper for paper in papers if paper[1] > importance]
        
        if len(largeNumbers) == 0 and order == M:
            print(N - len(papers))
        elif len(largeNumbers) > 0:
            papers.append(paper)
