// Math 객체

// 올림, 반올림, 버림
Math.ceil(0.1); // 1 
Math.round(0.5); // 1
Math.floor(0.9); // 0 

// 랜덤값
Math.random(); // 0 ~ 1 랜덤한 수를 반환
// 1~10 랜덤 숫자 획득
Math.ceil(Math.random() * 10);

// 최소값, 최대값, 절대값
const ARR = [3,4,8,65,15,1,89,25,11]
let max = Math.max(...ARR);
console.log(max);

let min = Math.min(...ARR);
console.log(min);

Math.abs(1);
Math.abs(-1);

