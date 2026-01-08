function solution(k, score) {
    let answer = [];
    let honor = []
    for(let i = 0; i < score.length; i++) {
        if(i < k) {
            honor.push(score[i])
        } else {
            if(honor[0] < score[i]) {
                honor[0] = score[i]
            }
        }
        honor.sort((a, b) => a - b)
        answer.push(honor[0])
    }
    return answer;
}