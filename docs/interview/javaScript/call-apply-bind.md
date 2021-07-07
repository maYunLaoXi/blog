---
title: 手写call、apply、bind
date: 2021-03-30
categories:
 - 前端知识
tags:
 - js
author: maYunLaoXi
---
## call

> function.call(thisArg, arg1, arg2, ...)
> `call()` 方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。(MDN)
### call的实现

```javascript
Function.prototype.myCall = function(thisArg, ...args) {
  // Symbol防止thisArg本身有fn属性
  var fn = Symbol('fn')
  thisArg = thisArg || window
  thisArg[fn] = this
  var resault = thisArg[fn](...args)
  // 用完了删除
  delete thisArg[fn]
  return resault
}
```

## apply

 apply与call 表现一样， 只是传参是以一个数组的形式

```javascript
Function.prototype.myApply = function(thisArg, args) {
  var fn = Symbol('fn')
  thisArg = thisArg || window
  thisArg[fn] = this
  // args是一个数组，但调用函数时传的参不是一个数组，所以要展开
  var resault = thisArg[fn](...args)
  delete thisArg[fn]
  return resault
}
```



## bind
> Function.prototype.bind
> bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。(MDN)

### bind的用法
```javascript
const obj = {
  name: 'obj',
  say: function() {
    console.log(this.name)
    return this.name
  }
}

const say = obj.say

say() // 
say() // undefined 调用了window的name

const newFn = say.bind(obj, '你好')
newFn() // obj
```

### bind的参数

1. 第一个参数作为this传给返回的函数，其他参数作为新函数执行时的参数;
2. 如果新函数被用了`new`操作符，那么this会变为new的实例对象（bind绑定的this将无效）
3. 新函数还可以接收参数，这些参数将并在bind接收的参数之后一起作为参数传入

### bind的实现

1. 绑定this

   ```javascript
   Function.prototype.myBind = function(thisArg, ...args) {
     return () => this.apply(thisArg, args) // 这理的this就是调用myBind的函数
     // 或
     var that = this
     return function() {
       return that.apply(thisArg, args)
     }
   }
   ```

2. 加入可传参

   ```javascript
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
   ```

3. 兼容new

   ```javascript
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
   ```

### 最后

bind返回的函数没有prototype属性， 但通过new生成的对象的原型为调用bind的函数

```javascript
function say() {
	console.log(this.name)
}
var obj = { name: 'objName' }

var bond = say.bind(obj)
console.log(bind.prototype) // undefined

var o = new bond()
o.__proto__ === say.prototype // true
o.__proto__.constructor === say // true
```

