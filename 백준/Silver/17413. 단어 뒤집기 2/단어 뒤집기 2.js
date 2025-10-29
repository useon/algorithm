const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('');

start();
// 결과 함수
function start() {
  const result = seperator().join('');
  console.log(result);
}

// 주어진 input을 돌면서 구분하는 함수
function seperator() {
  const result = [];
  let reverseTargetArr = [];
  let bracketIndex = [];
  // 큰 덩어리를 먼저 내고: <>와 아닌 부분 분류
  // 그 다음에 작은 덩어리를: 내서 공백을 기준으로
  // 작은 덩어리를 뒤집어 준다
  // 합쳐주기.
  for (let index = 0; index < input.length; index++) {
    // input배열을 처음부터 끝까지 돌면서 resultArr에 추가해주기.
    if (input[index] === '<' || input[index] === '>') {
      // 괄호 영역
      bracketIndex.push(index);
      // 이전까지 reverseTargetArr가 처리되지 않았으면 처리해준다.
      if (input[index] === '<' && reverseTargetArr.length > 0) {
        // 뒤집는 함수 실행하기
        const reverseResult = reverseWord(reverseTargetArr);
        //console.log(reverseResult, 'reverseResult');
        result.push(...reverseResult);
        // 처리 후 초기화
        reverseTargetArr = [];
      }
    }
    // 괄호 영역이 아닌 경우
    if (bracketIndex.length === 0) {
      reverseTargetArr.push(input[index]);
      //console.log(reverseTargetArr, 'reverseTargetArr');
    }
    // 괄호가 닫힌 경우
    if (bracketIndex.length === 2) {
      // 괄호 영역을 resultArr에 넣기(얘네는 별도의 reverse 필요없기때문에)
      result.push(...input.slice(bracketIndex[0], bracketIndex[1] + 1));
      // 괄호 영역을 담은 배열을 초기화
      bracketIndex = [];
    }
    // console.log(result, 'result', index, 'index');
  }
  // 만약 모든 input 배열을 처음부터 끝까지 돌았는데도 reverseTargetArr 남아있다면
  // 그건 애초에 주어진 input에 괄호 영역이 없는 경우이기 때문에
  // reverse 해서 넣어주면 된다.
  if (reverseTargetArr.length > 0) {
    const reverseResult = reverseWord(reverseTargetArr);
    result.push(...reverseResult);
  }
  return result;
}

function reverseWord(reverseTargetArr) {
  const reverseArr = [];
  // 공백이 있는 경우
  if (reverseTargetArr.includes(' ')) {
    // 분류 해주기
    // console.log(reverseTargetArr.join('').split(' '), 'reverseTargetArr');
    const arr = [];
    reverseTargetArr
      .join('')
      .split(' ')
      .map((word) => arr.push(word.split('').reverse()));
    for (let index = 0; index < arr.length; index++) {
      reverseArr.push(...arr[index]);
      if (index < arr.length - 1) {
        reverseArr.push(' ');
      }
    }
    // console.log(reverseArr);
  } else {
    reverseArr.push(...reverseTargetArr.reverse());
  }
  // console.log(reverseArr, 'reverseArr');
  return reverseArr;
}