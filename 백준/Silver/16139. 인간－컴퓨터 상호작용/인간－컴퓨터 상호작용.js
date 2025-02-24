const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const s = input[0];
const q = Number(input[1]);
const questions = input.slice(2, q + 2).map((x) => x.split(' '));
const notDuplicatedPrefixs = new Map();

for(let i = 0; i < q; i++) {
    const alphabet = questions[i][0];
    const start = Number(questions[i][1]);
    const end = Number(questions[i][2]);
    
    // 가지고 있지 않으면 누적합 먼저
    if(!notDuplicatedPrefixs.has(alphabet)) {
        const result = makePrefixSum(alphabet)
        notDuplicatedPrefixs.set(alphabet, result);
    }
    // 구간합을 계산해서 출력
    console.log(sumAtoB(alphabet, start, end))
}


// 알파벳 누적합
function makePrefixSum(alphabet) {
    const prefixSum = Array.from({length: s.length}).fill(0);
    for(let i = 0; i < s.length; i++) {        
        if(s[i] === alphabet) prefixSum[i] = 1;
    }
    return prefixSum;
}

// 알파벳 구간합
function sumAtoB(alphabet, start, end) {
    const prefixSum = notDuplicatedPrefixs.get(alphabet);
    let sum = 0;
    for(let i = start; i <= end; i++) {
        sum += prefixSum[i];
    }
    return sum;
}