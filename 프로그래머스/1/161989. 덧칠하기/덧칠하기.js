function solution(n, m, section) {
  let answer = 0;
  let paintedEnd = 0; 
    
  for (const pos of section) {
    if (pos <= paintedEnd) continue; 

    answer += 1;                     
    paintedEnd = pos + m - 1;        
  }

  return answer;
}