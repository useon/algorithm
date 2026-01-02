function solution(a, b, n) {
    let answer = 0;
    let emptyCount = n
    
    while(emptyCount >= a) {
        const quotient = Math.floor(emptyCount / a)
        const remain = emptyCount % a
        const colaCount = quotient * b
        emptyCount = colaCount + remain
        answer += colaCount
    }
    return answer;
}