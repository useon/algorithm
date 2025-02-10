// 차량별로 주차 요금 계산
// 기본 시간 180분, 요금 5000원, 단위 시간 10분, 단위 요금 600원
// fees -> 주차 요금, records -> 자동차의 입/출차 내역
function solution(fees, records) {
    //console.log(fees, 'fees');
    //console.log(records, 'records')    
    // 먼저 records를 가지고 차량(key)과 In, Out 시간(value)을 담은 Map객체를 만든다.
    const recordsMap = makeRecordsMap(records);
    // 주차 누적 시간(value)을 차량번호(key)로 담은 Map 객체를 만든다.
    const parkingTimeMap = parkingTimer(recordsMap);
    // 주차 요금을 계산한다.
    const chargeMap = calculatorCharge(fees, parkingTimeMap);
    // 차량 번호가 작은 자동차부터 출력하기 위해 정렬한다.
    const answer = sorterCarNumber(chargeMap);
    // 차량 번호가 가장 작은 자동차부터, 청구할 주차 요금을 차례대로 정수 배열에 담아서 return
    return answer;
}

function makeRecordsMap(records) {
    const recordsMap = new Map();
    for(let index = 0; index < records.length; index++) {
        const timeLine = records[index].split(' ');
        const time = timeLine[0].split(':').map((x) => +x);
        const carNumber = timeLine[1];
        // console.log(timeLine, 'timeLine')
        console.log(time, 'time')
        // 입차된 차량이 다음날 출차되는 경우 X, out으로 시작하는 경우는 없겠다.
        // 짝수로 짝지어 계산하면 되고 value 길이가 홀수면 [23:59] 를 추가하기.
        // 그 날 돈은 그 날 다 끝내 버려야 함.
        // Map에 넣는다.
        // 일단 Map에 차량번호가 있는경우 배열에 추가. 아니면 그냥 배열 추가
        if(recordsMap.has(carNumber)) {
            recordsMap.set(carNumber, [...recordsMap.get(carNumber), time]);
        } else {
            recordsMap.set(carNumber, [time]);
        }
    }
    recordsMap.forEach((value, key) => {
        // 만약 해당 value가 홀수이면 맨 마지막에 [23,59]를 넣어준다.
    if(value.length % 2 !== 0) {
        recordsMap.set(key, [...value, [23, 59]]);
    }
    })
    //console.log(recordsMap, 'recordsMap');
    return recordsMap;
}

function parkingTimer(recordsMap) {
    const parkingTimeMap = new Map();
    // 차량 번호(key), 주차 시간(value) 가 담긴 Map 객체를 순회하면서
    // 해당 차량 번호가 머문 총 시간을 구한다.
    recordsMap.forEach((value, key) => {
        let parkingTime = 0;
        //console.log(value, 'value');
        for(let index = value.length - 1; index >= 0; index--) {
            parkingTime += ((value[index][0] * 60) + value[index][1]) - ((value[index-1][0] * 60) + value[index-1][1]);
            index--
        }
        // 여기서 차량번호와 누적 주차 시간을 Map으로 넣어준다.
        // parkingTime도 초기화
        parkingTimeMap.set(key, parkingTime);
        parkingTime = 0;
    })
    //console.log(parkingTimeMap, 'parkingTimeMap')
    return parkingTimeMap;
}

// 주차 요금을 계산한다.
function calculatorCharge(fees, parkingTimeMap) {
    const chargeMap = new Map();
    const baseTime = fees[0];
    const baseCharge = fees[1];
    const unitTime = fees[2];
    const unitCharge = fees[3];
    // Map을 돌면서 주차 요금을 계산한다.
    parkingTimeMap.forEach((value, key) => {
        let allCharge = 0;
        // 추가 요금이 있는 경우 기본 요금 + 추가 요금
        if(value - baseTime > 0) {
            const overTime = value - baseTime;
            allCharge = baseCharge + (Math.ceil(overTime/unitTime) * unitCharge);
        } else {
            // 추가 요금이 없는 경우 기본 요금만 낸다.
            allCharge = baseCharge
        }
        chargeMap.set(key, allCharge);
    })
    //console.log(chargeMap, 'chargeMap');
    return chargeMap;
}

function sorterCarNumber(chargeMap) {
    // 차량번호가 작은 자동차인 걸 어떤 기준으로 가르지? 
    // 그냥 냅다 sort하면 되려나? 
    // 일단 해보자. 
    let sortMap = chargeMap;
    let sortArr = [...chargeMap];
    //console.log(sortArr, 'sortArr')
    sortMap = new Map(sortArr.sort((a, b) => Number(a[0]) - Number(b[0])));
    const result = [];
    sortMap.forEach((value, key) => {
        result.push(value);
    })
    // console.log(result, 'result')
    return result;
}