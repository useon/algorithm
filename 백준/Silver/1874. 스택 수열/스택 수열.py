import sys
from collections import deque
input = sys.stdin.read().splitlines()
n = int(input[0])
nums = deque(list(map(int, input[1:])))

def solve(n, nums):
    stack = []
    result = []
    num = 1
    while nums:
        target = nums[0]
    
        if not stack or stack[-1] < target:
            stack.append(num)
            result.append('+')
            if num < n:
                num += 1
        elif stack[-1] == target:
            stack.pop()
            result.append('-')
            nums.popleft()
        elif stack[-1] > target:
            return "NO"
    return '\n'.join(result)
    
print(solve(n, nums))
