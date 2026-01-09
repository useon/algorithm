function solution(cards1, cards2, goal) {
  let cards1Index = 0;
  let cards2Index = 0;

  for (let i = 0; i < goal.length; i++) {
    const target = goal[i];

    if (cards1[cards1Index] === target) {
      cards1Index += 1;
    } else if (cards2[cards2Index] === target) {
      cards2Index += 1;
    } else {
      return "No";
    }
  }
  return "Yes";
}