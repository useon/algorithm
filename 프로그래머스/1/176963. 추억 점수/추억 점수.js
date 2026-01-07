function solution(name, yearning, photo) {
    let answer = [];
    let nameMap = new Map()
    for(let i = 0; i < name.length; i++) {
        nameMap.set(name[i], yearning[i])
    }
    
    for(let j = 0; j < photo.length; j++) {
        const len = photo[j].length;
        let count = 0
        for(let k = 0; k < len; k++) {
            if(nameMap.has(photo[j][k])) count += nameMap.get(photo[j][k])
        }
        answer.push(count)
    }
    
    return answer;
}