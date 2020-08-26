---
title: 面试题之ES6的新特性（超详细）
date: 2020-08-26
categories:
 - 前端
tags:
 - es6
author: maYunLaoXi
---



ES6新增的内容比较多，而且开发当中也是常常会用到，有了各种babel的转换，市面上大在多数公司都在用ES6语法来开发。

`JavaScript`传说中是由网景公司的[Brendan Eich](https://baike.baidu.com/item/BrendanEich) 大神在10天内设计完成的。抛开一天时间设计一门编程语言这个话题不说，任何一门语言都不是100%完美的（当然php....）。

`JS`当然也有它的不足之处，比如说顶层对象的属性与全局变量的关系，而ES6方法当中的`const` `let` `modules`等都是试图在一定程度上改变JS历史遗留的问题，从而使其更加合理化。

因此，在学习一门语言的同时，我们多点留意这门语言的历史及其设计的目的，可以帮助我们更加深刻的理解这门语言，而不是一味的死记API。

ES6的学习当然是首推`阮一峰`老师的《ES6标准入门》一书。下面也是对这本书的个人阅读总结。



## 1. const 和 let

`let`: 声明在代码块内有效的变量。

特点：

1. 在存在变理提升（不能在变量声明之前使用）
2. let的暂时性死区： 其实与1差不多，只要在块作用域有声明，就不能在本作用域声明前用主个变量。
3. 不允许重复声明。

`const`:    声明一个只读的常量

特点：

1. 一但声明，这个值不能被改变（对于引用类型，是引用的地址不能被改变）
2. 声明时必须赋值

> 面试中常会问到var let const 三都的区别，回答的时候注重各自的特点，其实const let就是弥补var 的各种缺点，两都的特点就是var 的缺点。

> 工作中声明变量多用const 和 let
>
> 其中当声明的变量为引用类型如Array，如果没有直接更改引用的地址，可以使用const 



## 2. 解构赋值

什么是解构赋值？ 

按照一定模式从数组或对象中提取值，然后对变量进行赋值（先提取，再赋值）

数组： 

```javascript
let [a, b] = [1, 2]
// 以下的结果为右边数剩下的值所组成的数组
let [c, d ,...e] = [1, 2, 3, 4]
// 有默认值的写法
let [f = 100] = []  // f = 100
// 其中String也被视为类数组
let [a, b] = 'abcd' // a = a; b = b
```

对象: 

变理名要与对象的属性名一样才可以：

```
let { foo } = { foo: 1, bar: 2 } // foo = 1
// 重新命名（后面那个才是新变量）
let { foo: newFoo } = { foo: 1, bar: 2 } // newFoo = 1
```

实际使用： 

1. 交换两个变量的值

   ```javascript
   [x, y] = [y, x]
   ```

2. 函数的封装

   ```javascript
   function fn({ x, y } = {}) {
   	console.log(x, y)
   }
   ```

   其中，函数参数为一个对象，不会像`(x, y)`的形式这样固定参数的顺序，而`{} = {}`后面又赋一个空的对象就是为了在调用fn时不传参数而不会抛出错误导至程序中止

3. 函数返回值的解构

   函数返回多个值

   ```javascript
   // 有次序的
   function foo() {
   	return [a, b, c]
   }
   const [a, b, c] = foo()
   // 无次序的
   function foo() {
   	return { a, b, c}
   }
   const { b, a, c} = foo()
   ```

## 3. 模板字符串

```javascript
const h = 'hello'
`${ h } word`
```

特点：

​	可以换行，但是所有的空格和换行会被保留。

​	`${}`中可以使用任意的javaScript表达试、运算、引用对象属性、函数调用等。结果是其返回值。

## 4. 函数的扩展

1. 函数的默认值

   ```javascript
   function m(x = 1) {}
   ```

2. rest参数（用于获取函数的多余参数）

   ```javascript
   function a(...values) {
   	// value 是一个数组，第个元素是传入的各个参数
   }
   ```

3. 函头函数

   特点： 

   1. 函数体内的this = 定义时所在的对像
   2. 不可以当作构造函数（不能用new)
   3. 不可以用arguments对像，可以用rest
   4. 不可以用yield命令（不能用作Generator函数）

   > 阮老师的书中这一章讲到了有关尾调用，尾递归的内容，值得一看。

## 5. 数组的扩展

1. 扩展运算符。
    1. 用于替代数组的`apply`。

        call apply bind的区别： 
        用于改变this的指向， 第一个参数为this指向的对像，后面的参数是作为函数的参数。
        区加在于：call apply 会即调用，而bind是生成一个等调用的函数。call bind参数是一个个用逗号罗列，而apply 是传入一个数组。
        ```javaScript
        fn.apply(null, [1, 2, 3])
        fn.call(null, 1, 2, 3)
        fn.bind(null, 1, 2, 3)()
        // 指最大值
        Math.max(...[3,4,5,62,8])
        ```
    2. 合并数组
        ```
        // ES5
        [1, 2].concat(3)
        // ES6
        [1, 2, ...[3]]
        ```
        
    3. 新增的方法
        1. Array.from()将类数组转为数组
        * 可遍历的对象(iterable)(Set, Map)
        * 类似数组的对
        ```
        { '0': 'a', '1': 'b' }
        ```
        2. 实例的方法
        * `find()` `findIndex()`找出第一个符合条件的成页/下标（位置）
        * `entries()` `keys()` `values()` 用于遍历数组。（配合for...of)
        * `includes()` 是否存在指定无素(返回布尔值)
## 5. 对象的扩展
1. 属性的简写：
    ```JavaScript
    let a = 100
    { a } 
    // 等同于
    { a: 100 }
    ```
    方法名同样可以简写，vue中就常常用这种写法： 
    ```JavaScript
    export default {
        name: 'VueComp', 
        data() {}, 
        create() {},
    }
    // 等同于
    export default {
        name: 'VueComp',
        data: function() {}, 
        create: function() {},
    }
    ```