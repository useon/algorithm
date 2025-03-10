const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const money = Number(input[0]);
const stockPrice = input[1].split(' ').map((x) => +x);
const lastPrice = stockPrice[stockPrice.length - 1];

function handlerJunhyun() {
  let junhyunMoney = money;
  let junhyunBuying = Math.floor(money / stockPrice[0]);
  junhyunMoney = junhyunMoney % stockPrice[0];
  for (let index = 1; index < stockPrice.length; index++) {
    if (junhyunMoney >= stockPrice[index]) {
      junhyunBuying += Math.floor(junhyunMoney / stockPrice[index]);
      junhyunMoney = junhyunMoney % stockPrice[index];
    }
    if (index === stockPrice.length - 1) {
      const junhyunProperty = junhyunMoney + junhyunBuying * lastPrice;
      return junhyunProperty;
    }
  }
}

function handlerSeongmin() {
  let seongminMoney = money;
  let buyingCount = 0;
  let sellingCount = 0;
  let seongminBuying = 0;
  const variationArr = [];

  for (let index = 1; index < stockPrice.length; index++) {
    if (stockPrice[index - 1] < stockPrice[index]) {
      variationArr.push('+');
    }
    if (stockPrice[index - 1] > stockPrice[index]) {
      variationArr.push('-');
    }
    if (stockPrice[index - 1] === stockPrice[index]) {
      variationArr.push('=');
    }
    const threeVariation = variationArr.slice(index - 3, index);
    if (
      threeVariation[0] === '-' &&
      threeVariation[1] === '-' &&
      threeVariation[2] === '-'
    ) {
      seongminBuying += Math.floor(seongminMoney / stockPrice[index]);
      seongminMoney = seongminMoney % stockPrice[index];
    }
    if (
      threeVariation[0] === '+' &&
      threeVariation[1] === '+' &&
      threeVariation[2] === '+'
    ) {
      seongminMoney += seongminBuying * stockPrice[index];
      seongminBuying = 0;
    }
    if (index === stockPrice.length - 1) {
      const seongminProperty = seongminMoney + seongminBuying * lastPrice;
      return seongminProperty;
    }
  }
}

if (handlerSeongmin() > handlerJunhyun()) console.log('TIMING');
if (handlerSeongmin() < handlerJunhyun()) console.log('BNP');
if (handlerSeongmin() === handlerJunhyun()) console.log('SAMESAME');
