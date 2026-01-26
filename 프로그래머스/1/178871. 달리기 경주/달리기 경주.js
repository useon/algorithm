function solution(players, callings) {
  // 선수 이름 -> 현재 등수
  const indexMap = new Map();

  // 초기 등수 세팅
  for (let i = 0; i < players.length; i++) {
    indexMap.set(players[i], i);
  }

  // 호출 처리
  for (const name of callings) {
    const idx = indexMap.get(name);      
    const frontPlayer = players[idx - 1]; 

    // 배열에서 자리 교환
    players[idx - 1] = name;
    players[idx] = frontPlayer;

    // Map 갱신
    indexMap.set(name, idx - 1);
    indexMap.set(frontPlayer, idx);
  }

  return players;
}
