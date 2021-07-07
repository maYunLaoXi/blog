---
title: new的实现
date: 2021-04-02
categories:
 - 前端知识
tags:
 - js
author: maYunLaoXi
---

new 所做的事：
1. 创建一个对象
2. 将函数内的this指向这个对象
3. 执行函数内的方法
4. 返回这个对象

其中需要注意：
1. 创建一个对象，并且这个对象继承函数原型的属性和方法
2. 如果函数内部没有返回一个对象类型，那么会返回第一步创建的对象

``` javaScript
function myNew(Fn, ...args) {
  // 	创建一个对象
  var obj = Object(Fn.prototype)
  // 用obj调用fn
  var resault = Fn.apply(obj, args)
  // 返回
  var type = typeof resault
  var isObj = resault != null && (type === 'object' || type  ==='function')
  return isObj ? resault : obj
}
```

