import sys
inputData = sys.stdin.read().strip().split('\n')[1:]

uniqueWords = list(set(inputData))
uniqueWords.sort() 
uniqueWords.sort(key=len) 
print('\n'.join(uniqueWords))
