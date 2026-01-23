function solution(X, Y) {
    let answer = '';
    const temp = [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]]
    const sortedX = X.split('').map(Number).sort((a, b) => b - a)
    const sortedY = Y.split('').map(Number).sort((a, b) => b - a)

    for(let i = 0; i < sortedX.length; i++) {
        const target = sortedX[i]
        temp[target][0] += 1
    }
    
    for(let j = 0; j < sortedY.length; j++) {
        const target = sortedY[j]
        temp[target][1] += 1
    }
    
    for(let k = 9; k >= 0; k--) {
        const num = Math.min(temp[k][0], temp[k][1])
        if(num > 0) answer += String(k).repeat(num)
    }
    
    if (answer[0] === '0') return "0";
    if(answer === '') answer = "-1"
    
    return answer;
}