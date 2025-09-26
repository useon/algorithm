import sys
from collections import deque
input = sys.stdin.read().splitlines()
brackets = list(input[0])

def solve(brackets):
    stack = []
    totalPieces = 0
    for i, bracket in enumerate(brackets):
        if bracket == '(':
            stack.append(bracket)
        else:
            stack.pop()
            if brackets[i - 1] == '(': 
                totalPieces += len(stack)
            else: 
                totalPieces += 1
    return totalPieces

print(solve(brackets))
