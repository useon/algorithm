import sys
input = sys.stdin.read().splitlines()
n, m = list(map(int, input[0].split()))
setStrings = input[1 : n + 1]
testStrings = input[n + 1 : n + m + 1]
count = 0

for char in testStrings:
    if char in setStrings:
        count += 1

print(count)
