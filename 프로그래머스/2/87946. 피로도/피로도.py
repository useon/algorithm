from itertools import permutations

def solution(k, dungeons):
    answer = -1 # 최대 던전 수
    # 전체 순열의 수
    allPerms = list(permutations(dungeons, len(dungeons)))
    
    for perms in allPerms:
        # 최소 필요 피로도, 소모 피로도
        count = 0
        blood = k
        for requiredDamage, decreaseDamage in perms:
            if blood >= requiredDamage:
                count += 1
                blood -= decreaseDamage
            else:
                break
                
        if answer < count:
            answer = count
            
    return answer