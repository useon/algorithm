function solution(keymap, targets) {
    let answer = [];
    
    for(let i = 0; i < targets.length; i++) {
        let targetCount = 0
        for(let j = 0; j < targets[i].length; j++) {
            const target = targets[i][j]
            
            let minCount = Infinity
            for(let k = 0; k < keymap.length; k++) {
                const targetIndex = keymap[k].indexOf(target)
                if(targetIndex !== -1) {
                    minCount = Math.min(minCount, targetIndex + 1)
                }
            }
            if (minCount === Infinity) {
                targetCount = -1;
                break; 
            } else {
                targetCount += minCount;
            }
        }
        answer.push(targetCount)
    }
    return answer;
}