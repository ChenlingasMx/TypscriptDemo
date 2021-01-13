// 函数无返回值
function sayHi(): void {
  console.log("hi");
}

// 执行不完的函数
function errorFn(): never {
  throw new Error()
  console.log("Hello World");
}

// 函数参数为对象时
function add({ one, two }: { one: number, two: number }): number {
  return one + two
}
const total = add({ one: 1, two: 2 })