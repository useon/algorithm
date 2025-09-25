import sys
input_lines = sys.stdin.read().splitlines()
n = int(input_lines[0])
tokens = input_lines[1]
nums = list(int(line) for line in input_lines[2:])
maker = ['+', '-', '*', '/']

stack = [] # 뒤에서 빼는거기 때문에 stack 사용

for token in tokens:
    result = 0
    if 'A' <= token <= 'Z':
        # ord를 통해 아스키코드 값을 비교할 수 있다.
        index = ord(token) - ord('A')
        # A가 가장 먼저이고 순서대로니까 num에서 가져올 인덱스를 바로 구할 수 있다.
        stack.append(nums[index])
    else:
        # 순서가 중요하다. 후위 표현식이니까 무조건 먼저 뽑는 애는 두번째
        operand2 = stack.pop()
        operand1 = stack.pop()

        if token == '+':
            result = operand1 + operand2
        elif token == '-':
            result = operand1 - operand2
        elif token == '*':
            result = operand1 * operand2
        elif token == '/':
            result = operand1 / operand2

        stack.append(result)

finalResult = stack.pop()

# 소수점 둘째자리까지. 셋째자리에서 반올림 된다.
print(f"{finalResult:.2f}")
            