import sys

input = sys.stdin.read().splitlines()
# 단절점: 해당 정점 제거시 그 정점이 포함된 그래프가 2개 이상 나뉘는 경우
# 단절선: 해당 간선을 제거시 그 간선이 포함된 그래프가 2개 이상 나뉘는 경우
# 트리: 사이클 존재 x 모든 정점 연결

N = int(input[0])
graph = [[] for i in range(0, N + 1)]
q = int(input[N])

def makeTree(N):
    for i in range(1, N):
        a, b = map(int, input[i].split())
        graph[a].append(b)
        graph[b].append(a)

def makeAction(N):
    for i in range(N+1, N+q+1):
        t, k = map(int, input[i].split())
        if t == 1: # k번 정점이 단절점인지
            if len(graph[k]) > 1:
                print('yes')
            else:
                print('no')
        elif t == 2: # k번째 간선이 단절선인지
            print('yes') 
            
makeTree(N)
makeAction(N)
