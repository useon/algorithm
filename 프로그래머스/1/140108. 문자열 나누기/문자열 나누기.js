function solution(s) {
    let answer = 0;
    let x = ''
    let countX = 0
    let countY = 0
    
    for(let i = 0; i < s.length; i++) {
        if(countX === 0) { // 새 덩어리
            x = s[i] // 시작 문자
            countX = 1
            countY = 0
            continue
        }
        
        if(s[i] === x) countX++
        else countY++
        
        if(countX === countY) {
            answer++
            countX = 0
            countY = 0
        }
    }
    
    if(countX !== 0) answer++
    
    return answer;
}