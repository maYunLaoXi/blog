const obj = {
  name: 'obj\'s name',
  say: function(val, onther) {
    console.log(this.name)
    return [val, onther]
  }
}

const say = obj.say

say() // undefined 调用了window的name

var newFn = say.bind(obj, '你好')
console.log(newFn()) // obj 你好

// 实现bind

// 1. 简单改变this
Function.prototype.myBind = function(thisArg, ...args) {
  return () => this.apply(thisArg, args) // 这理的this就是调用myBind的函数
  // 或
  var that = this
  return function() {
    return that.apply(thisArg, args)
  }
}
var newFn = say.myBind(obj, '第一版')

console.log(newFn('第一版传参'))

// 2. 绑定函数传参
Function.prototype.myBind = function(thisArg, ...args) {
  return (...args2) => {
    return this.apply(thisArg, [...args, ...args2])
  }
}
// 或
Function.prototype.myBind = function(thisArg) {
  var that = this
  // 第二个到最后一个参数
  // arguments是类数组对象，调用slice方法可转换成数组， 当然也可以用Array.from(arguments)
  var args = Array.prototype.slice.call(arguments, 1)
  return function() {
    // 新函数的参数
    var args2 = Array.prototype.slice.call(arguments)
    return that.apply(thisArg, args.concat(args2))
  }
}
var newFn = say.myBind(obj, '第二版')
console.log(newFn('第二版传参'))

// 3. 兼容new

Function.prototype.myBind = function(thisArg) {
  var that = this
  var args = Array.prototype.slice.call(arguments, 1)

  var fBond = function() {
    var args2 = Array.prototype.slice.call(arguments)
    var isNewEnv = this instanceof that
    var newThis = isNewEnv ? this : thisArg
    return that.apply(newThis, args.concat(args2))
  }
  // 修复原型链
  function F() {}
  F.prototype = that.prototype
  fBond.prototype = new F()
  return fBond
}
var newFn = say.myBind(obj, '第三版')
console.log(newFn('第三版传参'))