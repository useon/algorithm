const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim();
const nums = input.split(' ').map(Number);
// 홀수 칵테일이 제일 맛있음. 그 중 수가 더 크면 그게 제일 맛있음.
// 모든 음료를 사용할 필요는 없지만 적어도 하나는 사용해야 함.
const flavors = [];

// 음료 세 개가 주어진다고 명시가 되어 있으니 
for(let i = 0; i < nums.length; i++) {
    flavors.push(nums[i]);
    for(let j = i + 1; j < nums.length; j++) {
        flavors.push(nums[i] * nums[j]);
        for(let z = j + 1; z < nums.length; z++) {
            flavors.push(nums[i] * nums[j] * nums[z]);
        }
    }
}

// 정렬
const sortedFlavor = flavors.sort((a, b) => b - a);
const filteredFlavor = sortedFlavor.filter((x) => x % 2 !== 0);

// 홀수가 없으면? 가장 큰 짝수를 출력.
console.log(filteredFlavor.length === 0 ? sortedFlavor[0] : filteredFlavor[0]);
