import sys
import heapq

max_pq = []
min_pq = []
deleted_dict = {}

lines = sys.stdin.read().splitlines()
N = int(lines[0])
questions = lines[1:N+1] # 문제 번호, 난이도
M = int(lines[N + 1])
commands = lines[N+2:N+2+M]

for question in questions:
    question_number, level = map(int, question.split())
    heapq.heappush(min_pq, [level, question_number])
    # 같은 난이도인 경우 난이도가 어려운 순으로
    heapq.heappush(max_pq, [-level, -question_number])
    deleted_dict[question_number] = level

for command in commands:
    a = command.split() # command의 길이에 따라 나누기
    if len(a) == 3:
        option = a[0]
        p = int(a[1])
        l = int(a[2])
        if option == 'add':
            if p not in deleted_dict:
                deleted_dict[p] = l
                heapq.heappush(max_pq, [-l, -p])
                heapq.heappush(min_pq, [l, p])
    else:
        option = a[0]
        target = int(a[1])
        if option == 'recommend':
            if target == 1:
                while max_pq:      
                    max_l, max_p = max_pq[0]
                    l = -max_l
                    p = -max_p
                    if p in deleted_dict and deleted_dict[p] == l:
                        print(p)
                        break
                    heapq.heappop(max_pq)
            elif target == -1:
                while min_pq:
                    l, p = min_pq[0]
                    if p in deleted_dict and deleted_dict[p] == l:
                        print(p)
                        break
                    heapq.heappop(min_pq)    
        elif option == 'solved':
            if target in deleted_dict:
                del deleted_dict[target]
    