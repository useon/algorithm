function solution(arr) {
    let sum = arr.reduce((a, b) => a + b);
    let avarage = sum / arr.length;
    return avarage;
}