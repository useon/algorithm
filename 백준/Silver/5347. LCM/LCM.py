import sys
import math
from collections import deque
input = sys.stdin.read().splitlines()
n = int(input[0])
cases = input[1:]

for i in range(0, n):
    a, b = map(int, cases[i].split())
    lcmValue = math.lcm(a, b)
    print(lcmValue)
    