import sys
from collections import deque

input_lines = sys.stdin.read().splitlines()
N = int(input_lines[0])
orders = input_lines[1:]
queue = deque()

for order_line in orders:
    parts = order_line.split()
    command = parts[0]
    
    if command == 'push':
        num = int(parts[1])
        queue.append(num)
    elif command == 'pop':
        if not queue:
            print(-1)
        else:
            print(queue.popleft())
    elif command == 'size':
        print(len(queue))
    elif command == 'empty':
        print(1 if not queue else 0)
    elif command == 'front':
        if not queue:
            print(-1)
        else:
            print(queue[0])
    elif command == 'back':
        if not queue:
            print(-1)
        else:
            print(queue[-1])
