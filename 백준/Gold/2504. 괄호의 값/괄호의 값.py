import sys
input = sys.stdin.read().splitlines()
brackets = list(input[0])

def solve(brackets):
    stack = []
    result = 0

    for bracket in brackets:
        if bracket == '(' or bracket == '[':
            stack.append(bracket)
        else:
            acc = 0
            if not stack:
                return 0

            isPair = False
                
            while stack:
                top = stack.pop()

                if top == '(' and bracket == ')':
                    if acc == 0:
                        stack.append(2)
                    else:
                        stack.append(acc * 2)
                    isPair = True
                    break
                elif top == '[' and bracket == ']':
                    if acc == 0:
                        stack.append(3)
                    else:
                        stack.append(acc * 3)
                    isPair = True
                    break
                elif isinstance(top, int):
                    acc += top
                else:
                    return 0
            if not isPair:
                return 0

    for num in stack:
        if isinstance(num, int):
            result += num
        else:
            return 0
            
    return result

print(solve(brackets))
