function solution(k, m, score) {
  let answer = 0;
  // 내림차순이니까 박스의 최솟값은 마지막
  const sortedScore = score.sort((a, b) => b - a);

  // m개씩 묶어서 박스 가격 계산
  for (let i = 0; i + m - 1 < sortedScore.length; i += m) {
    const minInBox = sortedScore[i + m - 1]; 
    answer += minInBox * m;
  }

  return answer;
}
