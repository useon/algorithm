function solution(n) {
  let answer = Infinity;
  for (let x = 1; x < n + 1; x++) {
    if (n % x === 1) {
      answer = Math.min(answer, x);
    }
  }
  
  return answer;
}