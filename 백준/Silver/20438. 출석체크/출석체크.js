const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
// N: 전체 학생 수 (3번부터 N + 2번까지)
// K: 졸고 있는 학생 수
// Q: 지환이가 출석 코드 보낼 학생 수
// M: 구간 쿼리 수
const [N, K, Q, M] = input[0].split(' ').map(Number);

// 두 번째 줄: 졸고 있는 학생들의 입장 번호
// 빠르게 확인하기 위해 Set으로
const sleepingStudents = new Set(input[1].split(' ').map(Number));

// 세 번째 줄: 지환이가 처음 출석 코드를 보낼 학생들의 입장 번호
const initialCodeSenders = input[2].split(' ').map(Number);

// 학생 입장 번호의 최대값 (N + 2)
const MAX_STUDENT_ID = N + 2;

// 출석 여부 저장
// 학생 번호는 3부터 시작하기 때문에 이렇게 맞춘다.
// 출석 - true, 결석 - false
const studentAttenede = Array(MAX_STUDENT_ID + 1).fill(false);

// 출석 코드를 보낼 수 있는 모든 학생을 탐색하며 출석 처리

for(const senderId of initialCodeSenders) {
    // 만약 코드를 보낸 학생이 졸고 있는 학생이라면 다음 차례로
    if(sleepingStudents.has(senderId)) {
        continue;
    }

    // 졸고 있지 않은 학생이라면 이 학생의 배수들에 코드를 보냄
    for(let i = senderId; i <= MAX_STUDENT_ID; i += senderId) {
        // 배수에 해당하는 학생이 졸고 있는 경우
        if(sleepingStudents.has(i)) {
            continue; // 코드를 받았지만 출석 처리는 되지 않는다.
        }
        // 졸고 있지 않은 학생이고 코드를 받았으므로 출석 처리
        studentAttenede[i] = true;
    }
}

// 출석이 되지 않은 학생 수 조회하기 위한 누적합
const unattenedePrefixSum = Array(MAX_STUDENT_ID + 1).fill(0);

// 3번 학생부터 누적합 계산
for(let i = 3; i <= MAX_STUDENT_ID; i++) {
    unattenedePrefixSum[i] = unattenedePrefixSum[i - 1];

    // 만약 출석 코드를 받지 못했거나, 
    // 받았는데 졸고 있는 학생인 경우
    if(!studentAttenede[i]) {
        unattenedePrefixSum[i]++;
    }
}

// M개의 구간(쿼리가 여러개 주어질 수 있기 때문에)
const results = [];
for(let i = 0; i < M; i++) {
    const [S, E] = input[3 + i].split(' ').map(Number);

    // 구간 S부터 E까지 출석 안 한 학생 수
    // = 1번부터 E번까지 출석 안 한 학생 수
    // - 1번부터 S-1번까지 출석 안 한 학생 수
    const count = unattenedePrefixSum[E] - unattenedePrefixSum[S - 1];
    results.push(count);
}

console.log(results.join('\n'));
