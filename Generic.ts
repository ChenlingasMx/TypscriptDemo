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
function moreFun<T, P>(first: T, second: P) {
  console.log(`${first}${second}`)
}
moreFun<string, number>('1', 1)

/*
类的泛型
*/
interface Girl {
  name: string
}
class SelectGirl<T extends Girl>{
  constructor(private girls: T[]) { }
  getGirl(index: number) {
    console.log(this.girls[index].name)
  }
}
const newGirls = new SelectGirl([
  { name: "大脚" },
  { name: "刘英" },
  { name: "晓红" },
])
newGirls.getGirl(1)

/*
  类的约束型泛型
*/
class SelectBoys<T extends number | string> {
  constructor(private boys: T[]) { }
  getBoys(index: number): T {
    return this.boys[index]
  }
}
const newBoys = new SelectBoys<string>(['11', '22', '33'])
newBoys.getBoys(1)


/* 泛型函数 */
function indentity<T>(arg: T): T {
  return arg
}
// 1.常规形式
let myFirstIndentity: <T>(arg: T) => T = indentity
// 2.标签形式
let mySecondIndentity: { <T>(arg: T): T } = indentity;

/* 泛型函数作为接口使用 */
interface GenericIdentityFn<T> {
  (arg: T): T
}
function secondIndentity<T>(arg: T): T {
  return arg
}
let myThirdIndentity : GenericIdentityFn<number> = secondIndentity