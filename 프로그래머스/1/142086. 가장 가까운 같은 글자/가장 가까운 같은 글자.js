function solution(s) {
    let answer = [];
    const strMap = new Map()
    for(let i = 0; i < s.length; i++) {
        const str = s[i]
        if(strMap.has(str)) {
            const strIndex = strMap.get(str)
            answer.push(i - strIndex)
            strMap.set(str, i)
        } else {
            answer.push(-1)
            strMap.set(str, i)
        }
    }
    return answer;
}