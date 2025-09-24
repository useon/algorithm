import sys
from collections import deque
input_lines = sys.stdin.read().splitlines()
N = int(input_lines[0])
info_lines = input_lines[1:]
deque = deque()

for info_line in info_lines:
    commands = info_line.split()
    command = commands[0]
    if command == 'push_front':
        num = int(commands[1])
        deque.appendleft(num)
    elif command == 'push_back':
        num = int(commands[1])
        deque.append(num)
    elif command == 'pop_front':
        if not deque:
            print(-1)
        else:
            print(deque.popleft())
    elif command == 'pop_back':
        if not deque:
            print(-1)
        else:
            print(deque.pop())
    elif command == 'size':
        print(len(deque))
    elif command == 'empty':
        if not deque:
            print(1)
        else:
            print(0)
    elif command == 'front':
        if not deque:
            print(-1)
        else:
            print(deque[0])
    elif command == 'back':
        if not deque:
            print(-1)
        else:
            print(deque[-1])
        