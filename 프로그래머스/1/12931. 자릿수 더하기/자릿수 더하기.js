function solution(n) {
  let answer = 0;
  const converted = String(n);
  for (let i = 0; i < converted.length; i++) {
    answer += Number(converted[i]);
  }
  return answer;
}