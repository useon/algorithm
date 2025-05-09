const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const T = Number(input[0]);
const info = input.slice(1);

for(let i = 0; i < 2 * T - 1; i += 2) {
    const W = info[i];
    // 와 여기 string이어서 틀렸던 것이었음
    const K = Number(info[i + 1]);
    const charObj = {};
    let minLength = Infinity;
    let maxLength = -1;
    
    // 각 문자열마다 위치를 저장하기
    for(let j = 0; j < W.length; j++) {
        const char = W[j];
        if(!charObj[char]) charObj[char] = [];
        charObj[char].push(j);
    }
    // 어떤 문자를 정확히 K개 포함하는 가장 짧은 연속 문자열
    // 일단 K개 포함하는 문자열을 추리자.
    for(const char in charObj) {
        const positions = charObj[char];
        // positions의 갯수가 K보다 작으면 충족X이므로 넘어가기
        if(positions.length < K) continue;
        // 최소와 최대를 구해보자
        // k개의 숫자 제한이 있으니까 경계값 조심
        // ex. k = 2인 경우 i는 0이랑 1까지만 가능
        for(let z = 0; z <= positions.length - K; z++) {
            const start = positions[z];
            // 이것도 K가 주어지는 것이기 때문에
            // K에 따라 다르게 포함해야 하니까
            const end = positions[z + K - 1];
            const length = end - start + 1;
            minLength = Math.min(minLength, length);
            maxLength = Math.max(maxLength, length);
        }
    }
        if(minLength === Infinity) {
            console.log(-1);
        } else {
            console.log(minLength, maxLength);
        }
}
