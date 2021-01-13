interface Waiter {
  anjiao: boolean,
  say: () => {}
}
interface Teacher {
  anjiao: boolean,
  skill: () => {}
}
// 类型保护类型判断
function Jack(work: Waiter | Teacher) {
  if (work.anjiao) {
    (work as Teacher).skill()
  } else {
    (work as Waiter).say()
  }
}
// 类型保护-in语法
function JackTwo(work:Waiter|Teacher){
  if('skill' in work){
    work.skill()
  }else{
    work.say()
  }
}
// 类型保护-typeof
function add(firstNum:string|number,secondNum:string|number){
  if(typeof firstNum ==='string'||typeof secondNum==='string' ){
    return `${firstNum}${secondNum}`
  }else{
    return firstNum+secondNum
  }
}
// 类型保护-instanceof
class NumberObj {
  count :number
}
function addObj(first: object | NumberObj, second: object | NumberObj) {
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count;
  }
  return 0;
}