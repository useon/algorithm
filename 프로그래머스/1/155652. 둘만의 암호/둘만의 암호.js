function solution(s, skip, index) {
  let answer = '';
  const alpha = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const filteredAlpha = alpha.filter((x) => !skip.includes(x));
  const len = filteredAlpha.length;

  for (let i = 0; i < s.length; i++) {
    const cur = filteredAlpha.indexOf(s[i]);
    // 끝 넘어가면 자동으로 0부터 다시
    const next = (cur + index) % len; 
    answer += filteredAlpha[next];
  }

  return answer;
}