import sys
input = sys.stdin.read().splitlines()
n, m = list(map(int, input[0].split()))
pocketmons = input[1:n+1]
cases = input[n+1: n+m+2]
pocketmonsData = {}

for i, pocketmon in enumerate(pocketmons):
    pocketmonsData[pocketmon] = str(i + 1)
    pocketmonsData[str(i + 1)] = pocketmon
    

for case in cases:
    print(pocketmonsData.get(case))
    