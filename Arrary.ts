// 数组
const List: String[] = ['1', '2', '3']

const List2: Number[] = [1, 2, 3]

const List3: (string | number)[] = ['1', 2, '3']

const List4: ({ name: string, age: number })[] = [
  { name: 'Jack', age: 18 },
  { name: 'Rose', age: 19 }
]

type Type = { name: string, age: number };
const List5: Type[] = [
  { name: 'Jack', age: 18 }
]

class Type2 { name: string; age: number }
const List6: Type2[] = [
  { name: 'Jack', age: 18 }
]