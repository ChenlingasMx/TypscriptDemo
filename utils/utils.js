//判断是否是数组遍历
export function isArry(item) {
  const data = Array.isArray(item);
  if (data) {
    return item;
  } else {
    return [];
  }
}

// 获取当前月的所有天数的数组
export function getMonthList(month) {
  var date = new Date()
  var year = date.getFullYear()
  var d = new Date(year, month, 0)
  var dayCounts = d.getDate()
  var arr = []
  for (var i = 0; i <= dayCounts - 1; i++) {
    arr.push(moment(`${year}-${month}-${i + 1}`).format('YYYY-MM-DD'))
  }
  return arr
}

// 转换天秒
export function getDuration(my_time) {
  var days = my_time / 1000 / 60 / 60 / 24;
  var daysRound = Math.floor(days);
  var hours = my_time / 1000 / 60 / 60 - (24 * daysRound);
  var hoursRound = Math.floor(hours);
  var minutes = my_time / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
  var minutesRound = Math.floor(minutes);
  //var seconds = my_time / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
  // console.log('转换时间:', daysRound + '天', hoursRound + '时', minutesRound + '分', seconds + '秒');
  var time = null
  if (daysRound) {
    time = daysRound + '天' + hoursRound + '时' + minutesRound + '分'
  }
  if (!daysRound && hoursRound) {
    time = hoursRound + '时' + minutesRound + '分'
  }
  if (!daysRound && !hoursRound && minutesRound) {
    time = minutesRound + "分"
  }
  if (!daysRound && !hoursRound && !minutesRound) {
    time = '-'
  }
  return time;
}
// 通过身份证获取年龄
export function GetAge(identityCard) {
  var len = (identityCard + "").length;
  var strBirthday = "";
  if (len === 18)//处理18位的身份证号码从号码中得到生日和性别代码
  {
    strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
  }
  if (len === 15) {
    var birthdayValue = '';
    birthdayValue = identityCard.charAt(6) + identityCard.charAt(7);
    if (parseInt(birthdayValue) < 10) {
      strBirthday = "20" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
    } else {
      strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
    }

  }
  //时间字符串里，必须是“/”
  var birthDate = new Date(strBirthday);
  var nowDateTime = new Date();
  var age = nowDateTime.getFullYear() - birthDate.getFullYear();
  //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
  if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() === birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

/**
         * 通过身份证号码得到性别
         *  身份证号码 return 1/2 男/女
*/
export function getSexForCard(str) {
  const inputStr = str.toString();
  let sex;
  if (inputStr.length === 18) {
    sex = inputStr.charAt(16);
    if (sex % 2 === 0) {
      return 2;
    } else {
      return 1;
    }
  } else {
    sex = inputStr.charAt(14);
    if (sex) {
      if (sex % 2 === 0) {
        return 2;
      } else {
        return 1;
      }
    }

  }
  return 0
}
// 实现promise
export function promiseAll(promises) {
  return new Promise(function (resolve, reject) {
    if (!isArray(promises)) {
      return reject(new TypeError('arguments must be an array'));
    }
    var resolvedCounter = 0;
    var promiseNum = promises.length;
    var resolvedValues = new Array(promiseNum);
    for (var i = 0; i < promiseNum; i++) {
      (function (i) {
        Promise.resolve(promises[i]).then(function (value) {
          resolvedCounter++
          resolvedValues[i] = value
          if (resolvedCounter == promiseNum) {
            return resolve(resolvedValues)
          }
        }, function (reason) {
          return reject(reason)
        })
      })(i)
    }
  })
}

// 数组去重-针对数组元素类型不定情况下,通常是数组内包裹对象(利用对象的key唯一特效);
function unique(arr) {
  let obj = {};
  arr.forEach((item) => obj[item.name] = item);
  let a = [];
  for (let key in obj) { a.push(obj[key]) };
  return a
}

// 数组去重-利用splice直接在原数组进行操作
Array.prototype.distinct = function () {
  var arr = this,
    i,
    j,
    len = arr.length;
  for (i = 0; i < len; i++) {
    for (j = i + 1; j < len; j++) {
      if (arr[i] == arr[j]) {
        arr.splice(j, 1);
        len--;
        j--;
      }
    }
  }
  return arr;
};
// 数组去重-利用indexOf
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!')
    return
  }
  var array = [];
  for (var i = 0; i < arr.length; i++) {
    if (array.indexOf(arr[i]) === -1) {
      array.push(arr[i])
    }
  }
  return array;
}
// 数组去重-loadsh import uniqBy from 'lodash/uniqBy';
uniqBy([], key)

// 简易递归函数
function shownumber() {
  var n = 0;
  n += 1;
  if (n === 10000) {
    console.log(n);
    return;
  }
  shownumber();
}

// 浅拷贝只能用于对象中只包含基本类型的数据，修改其中一个的属性后，相互不影响，当对象中仍然包含对象类型的数据时，则是引用关系，修改会相互影响，所以这种情况需要用到深拷贝
// 简单潜拷贝
function fn() {
  let obj2 = {}
  for (let key in obj) {
    obj2[key] = obj[key]
  }
  obj2.name = 'CCC'
  return obj2
}

// 简单深拷贝
function deepClone(obj) {
  let objClone = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = deepClone(obj[key]); // --------- 递归调用，deepClone()函数的返回值是objClone
        } else {
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}
const params = {
  name: 'wang',
  address: {
    city: ['china', 'choing'],
    district: {
      town: 'jiazhou'
    }
  }
};
const b = deepClone(params);


// 闭包
function fn() {
  var a = 12;
  return function () {
    return a;
  }
}
// 查看密钥
// ls ~/.ssh
// cd /.ssh

// 16.4之前
// constructor → componentWillMount → render → componentDidMount
// props更新 componentWillReceiveProps → shouldComponentUpdate(如果返回true) → componentWillUpdate → render → componentDidUpdate
// state更新 shouldComponentUpdate (如果返回true)→ componentWillUpdate → render → componentDidUpdate
// 组件卸载 componentWillUnmount

// 16.4之后
// constructor => getDerivedStateFromProps => shouldComponentUpdate => render => getSnapshotBeforeUpdate => componentDidMount => componentWillUnmount

// 关于js中的同步和异步
// （1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

// （2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

// （3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

// （4）主线程不断重复上面的第三步。