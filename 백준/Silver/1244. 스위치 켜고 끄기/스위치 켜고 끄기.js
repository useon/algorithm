const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const switchNumber = Number(input[0]);
let stateArr = input[1].split(' ').map((x) => +x);
const studentNumber = Number(input[2]);
const studentArr = input.slice(3).map((item) => item.split(' ').map((x) => +x));

for (let index = 0; index < studentNumber; index++) {
  // 일단 여자인지 남자인지
  const gender = studentArr[index][0];
  // 남자인 경우
  if (gender === 1) {
    setiingMale(studentArr[index][1]);
  }
  // 여자인 경우
  if (gender === 2) {
    settingFemale(studentArr[index][1]);
  }
}

function setiingMale(number) {
  // 어쨌든 switchNumber 보다 작은 양의 정수가 들어옴.
  // 배수를 찾는 방법은?
  for (let index = 1; index * number <= switchNumber; index++) {
    const state = stateArr[index * number - 1];
    if (state === 1) stateArr[index * number - 1] = 0;
    if (state === 0) stateArr[index * number - 1] = 1;
  }
}

function settingFemale(number) {
  const target = number - 1;
  let left = number - 2;
  let right = number;
  // 처음 시작할 때 일단 본인 스위치 바꾸기
  if (stateArr[target] === 0) {
    stateArr[target] = 1;
  } else {
    stateArr[target] = 0;
  }

  // 여자이면 일단 본인 스위치를 중심으로 대칭이면 스위치 바꾸고 아니면 안바꿈
  while (stateArr[left] === stateArr[right]) {
    if (stateArr[left] === 0) {
      stateArr[left] = 1;
      stateArr[right] = 1;
    } else {
      stateArr[left] = 0;
      stateArr[right] = 0;
    }
    left -= 1;
    right += 1;
  }
}

// 하지만 한 줄에 20개씩만 출력
if (switchNumber > 20) {
  let lineArr = stateArr;
  const repetition = Math.floor(switchNumber / 20) + 1;
  for (let index = 0; index < repetition; index++) {
    console.log(lineArr.slice(0, 20).join(' '));
    lineArr = lineArr.splice(20);
  }
} else {
  console.log(stateArr.join(' '));
}
