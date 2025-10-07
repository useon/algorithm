import sys
input = sys.stdin.read().splitlines()
treeData = {}

for line in input:
    if line in treeData:
        treeData[line] = treeData[line] + 1
    else:
        treeData[line] = 1
        
totalCount = len(input)
treeCount = len(treeData)

# 정렬된 키를 이용하기
for key in sorted(treeData):
    percent = treeData[key] / totalCount * 100
    print(f"{key} {percent:.4f}")
    