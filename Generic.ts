/*
  泛型的基本使用
*/
function join<name>(first: name, second: name) {
  return `${first}${second}`
}
// 字符串类型
join<string>('1', '2')
// number类型
join<number>(1, 2)

/*
  数组泛型的使用
*/
function myHandle<ANY>(params: ANY[]) {
  console.log('params', params)
}
myHandle<string>(['1', '2']);

function myFun<ANY>(params: Array<ANY>) {
  console.log('params', params)
}
myFun<string>(["123", "456"]);

/*
  多个泛型
*/
function moreFun<T,P>(first:T,second:P){
  console.log(`${first}${second}`)
} 
moreFun<string,number>('1',1)