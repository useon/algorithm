const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const fileNumber = Number(input[0]);
let fileMap = new Map();
result();

// 정답을 구하는 전체 함수
function result() {
  seperator();
  if (fileMap.size > 1) {
    sorting();
  }
  printing();
}

// 전체를 돌면서 .을 기준으로 자르면서 확장자별로 정리하기
function seperator() {
  for (let index = 1; index <= fileNumber; index++) {
    //console.log(input[index], 'input[index]');
    const extension = input[index].split('.')[1].trim();
    //console.log(extension, 'extension');
    // Map에 집어넣기
    // 만약 이미 이 확장자가 있다면 파일 갯수를 더해주고
    // 아니면 새로 집어넣기
    if (fileMap.has(extension)) {
      fileMap.set(extension, fileMap.get(extension) + 1);
    } else {
      fileMap.set(extension, 1);
    }
  }
}

// 확장자가 여러개이면 사전순으로 sort
function sorting() {
  fileMap = new Map([...fileMap].sort());
}

// 출력
function printing() {
  let result = '';
  for (const [key, value] of fileMap) {
    result += `${key} ${value}\n`;
  }
  console.log(result.trim());
}