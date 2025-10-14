import sys
import heapq

lines = sys.stdin.read().splitlines()
T = int(lines[0])
index = 1

def calculate(operations):
    min_pq = []
    max_pq = []
    count_dict = {}  
    
    for line in operations:
        operation, s = line.split()
        n = int(s)

        if operation == 'I':
            heapq.heappush(min_pq, n)
            heapq.heappush(max_pq, -n)
            count_dict[n] =  count_dict.get(n, 0) + 1

        else:
            if n == -1:
                while min_pq:
                    v = heapq.heappop(min_pq)
                    if count_dict.get(v, 0) > 0:
                        count_dict[v] -= 1
                        if count_dict[v] == 0:
                            del count_dict[v] 
                        break 
            else:  
                while max_pq:
                    v = -heapq.heappop(max_pq)
                    if count_dict.get(v, 0) > 0:
                        count_dict[v] -= 1
                        if count_dict[v] == 0:
                            del count_dict[v]
                        break 

    max_val = None
    while max_pq:                                 
        v = -heapq.heappop(max_pq)
        if count_dict.get(v, 0) > 0:
            max_val = v
            break

    min_val = None
    while min_pq:
        v = heapq.heappop(min_pq)
        if count_dict.get(v, 0) > 0:
            min_val = v
            break

    if max_val is None or min_val is None:
        return "EMPTY"
    return f"{max_val} {min_val}"

while index < len(lines):
    k = int(lines[index])
    operations = lines[index + 1 : index + 1 + k]
    print(calculate(operations))
    index += k + 1
