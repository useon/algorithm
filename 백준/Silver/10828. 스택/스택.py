import sys
from collections import deque
input_lines = sys.stdin.read().splitlines()

N = int(input_lines[0])
orders = input_lines[1:]
stack = []

for order in orders:
    commands = order.split()
    command = commands[0]
    if command == 'push':
        stack.append(int(commands[1]))
    elif command == 'pop':
        if not stack:
            print(-1)
        else:
            print(stack.pop())
    elif command == 'size':
        print(len(stack))
    elif command == 'empty':
        if not stack:
            print(1)
        else:
            print(0)
    elif command == 'top':
        if not stack:
            print(-1)
        else:
            print(stack[-1])
            