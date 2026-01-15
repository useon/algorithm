function solution(babbling) {
  const words = ["aya", "ye", "woo", "ma"];
  let answer = 0;

  for (const s of babbling) {
    let i = 0;
    let prev = ""; 
    let ok = true;

    while (i < s.length) {
      let matched = false;

      for (const w of words) {
        if (w === prev) continue; 
        if (s.startsWith(w, i)) {
          i += w.length;
          prev = w;
          matched = true;
          break;
        }
      }

      if (!matched) {
        ok = false;
        break;
      }
    }

    if (ok) answer += 1;
  }

  return answer;
}
