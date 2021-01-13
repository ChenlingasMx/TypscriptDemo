/*
  1.类的基本使用和继承
   public:允许在类的内部和外部被调用
   private:只允许再类的内部被调用，外部不允许调用
   protected:允许在类内及继承的子类中使用
*/
class Person {
  public name: string;
  sayHello() {
    return this.name;
  }
}
class Man extends Person {
  sayLove() {
    return 'I love you'
  }
  say() {
    return super.sayHello() + this.sayLove()
  }
}
const jack = new Man()
jack.name = '帅哥'
console.log(jack.say())

/*
   2.类的构造函数
*/
class Father {
  constructor(public name: string) {
  }
  say() {
    return `我是爸爸${this.name}`
  }
}
class Son extends Father {
  constructor(public age: number) {
    super('爸爸')
  }
}
const MySon = new Son(18)
console.log(MySon.age, MySon.name, MySon.say())

/*
   3.类的Getter和Setter
*/
class XiaoJieJie {
  constructor(private _age:number){}
  get(){
    return this._age-10
  }
  set age(age:number){
    this._age=age+3
  }
}
let Rose = new XiaoJieJie(28)
Rose.age =25
console.log(Rose.age)

/*
  4.static简化类
*/ 
class Girl {
  static sayLove() {
    return "I Love you";
  }
}
console.log(Girl.sayLove());

/*
  5.抽象类
*/ 
abstract class Yushi {
  abstract skill()
}

class Waiter extends Yushi{
  skill(){
    return '我是送水的'
  }
}

class BaseTeacher extends Girl{
  skill(){
      console.log('我是初级泰式按摩')
  }
}

class seniorTeacher extends Girl{
  skill(){
      console.log('我是高级全身spa按摩')
  }
}
