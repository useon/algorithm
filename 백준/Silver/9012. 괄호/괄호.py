import sys
from collections import deque
input_lines = sys.stdin.read().splitlines()

T = int(input_lines[0])
info = input_lines[1:]
result = []

def popBracket(brackets):
    stack = []
    for bracket in brackets:
            if bracket == '(':
                stack.append('(')
            else:  
                if not stack:
                    return 'NO'     
                elif stack[-1] == '(':
                    stack.pop()
    return 'YES' if not stack else 'NO'

for i in range(0, T):
    brackets = list(info[i])
    result.append(popBracket(brackets))

print('\n'.join(result))
