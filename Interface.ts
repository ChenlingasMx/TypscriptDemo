
interface Girl {
  name: string;
  age: number;
  bust: number;
  height?: number;
  // 参数名:字符串:可以是任何类型
  [propName: string]: any,
  say(): string;
}
const screenResume = (girl: Girl) => {
  const { name,age, bust } = girl
  age < 24 && bust >= 90 && console.log(name + "进入面试");
  age > 24 || (bust < 90 && console.log(name + "你被淘汰"));
}
const getPerson = (girl: Girl) => {
  const { name, age, bust, sex } = girl
  console.log(`姓名:${name}年龄:${age}胸围:${bust}性别:${sex}`)
  girl.say()&&console.log(girl.say())
}
let girl = { name: "大脚", age: 18, bust: 94,sex:'女',say(){return '我是小姐姐'} }
screenResume(girl);
getPerson(girl);


const handleView = (value:string|number):string|number=>{
  return value
}
handleView('你好我是一个大帅哥')
