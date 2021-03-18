---
title: 面试题之ES6的新特性（详细）
date: 2020-08-26
categories:
 - 前端
tags:
 - es6
 - javaScript
author: maYunLaoXi
---



ES6新增的内容比较多，而且开发当中也是常常会用到，有了各种babel的转换，市面上大在多数公司都在用ES6语法来开发。

`JavaScript`传说中是由网景公司的[Brendan Eich](https://baike.baidu.com/item/BrendanEich) 大神在10天内设计完成的。抛开短时间设计一门编程语言这个话题不说，任何一门语言都不是100%完美的（php....）。

`JS`当然也有它的不足之处，比如说顶层对象的属性与全局变量的关系，而ES6方法当中的`const` `let` `modules`等都是试图在一定程度上改变JS历史遗留的问题，从而使其更加合理化。

因此，在学习一门语言的同时，我们多点留意这门语言的历史及其设计的目的，可以帮助我们更加深刻的理解这门语言，而不是一味的死记API。

ES6的学习当然是首推`阮一峰`老师的《ES6标准入门》一书。下面也是对这本书的个人阅读总结。

先来张搬砖图:

[![w1pLZj.md.jpg](https://s1.ax1x.com/2020/09/09/w1pLZj.md.jpg)](https://imgchr.com/i/w1pLZj)


## 1. const 和 let

`let`: 声明在代码块内有效的变量。

特点：

1. 不存在变理提升（不能在变量声明之前使用）
2. let的暂时性死区： 其实与1差不多，只要在块作用域有声明，就不能在本作用域声明前用这个变量。
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

3. 箭头函数

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

    

2. 属性名可心使用表达式： 

    ```javascript
    
    let foo = 'foo'
    
    let obj = {
    	[foo]: 'fooValue'
    }
    
    ```
    
3. 新增一些方法：

   * Object.is()

    * Object.assign()

    * 对像的一些遍历：

      Object.keys(), Object.values(), Object.entries()

      ```javascript
      for(let key of Object.keys(obj)) {}
      for(let value of Object.values(obj)) {}
      for(let [key,value] of Object.entries(obj)){}
      ```

    * 扩展运算符（常用）(es2017新增，在webpack中要另外的babel转换)

   ## 6. Symbol

   javascript又新增的一种数据类型（第七种，另外6种为：`Undefined`、`Null`、`Boolean`、`String`、`Number`、`Object`)

   注：symbol作为对象的属性名时不会被`for...in`,`for...of`,`Object.keys()`识别；可以改用`Reflect.ownkeys`方法.

   

   ## 7. Set、Map

   Set和map是ES6新增的数据结构。

   * Set

     特点： 1. 类似数组，但其成员是唯一的。

     	2. 是一个构造函数。

     用法： 

     ​	数组去重：

     ```javascript
     [...new Set([1,1,1,2,3,4,3])]
     Array.from(new Set([1,1,1,2,3,4,3]))
     ```

   * Map

     特点： 

     1. 为了解决javascript的对象只能用了符串作为键的问题。

     用法： （使用实例的set,get,delete方法增，查，删）

     ```javascript
     const m = new Map()
     const obj = {a: 'aa'}
     m.set(obj, 'obj as key')
     m.get(obj) // 'obj as key'
     m.delete(obj)
     ```

     也可以在new 时接受一个数组

     ```javascript
     const obj = { a: 'aa'}
     const m = new Map([
     	['name': 'ym'],
     	[obj, { b: 'bbbb' }]
     ])
     ```

     > 这段时间有一个很火的文章讲如何使用map组构来优化长长的if..else的
   
## 8. Promise

   是异步编程的一种解决方案。

   特点： 

   1. 状态不受外界影响（有三种状态：padding, fulfilled,redected)
   2. 一旦状态改变就不会再变。

   用法： 

   ```javascript
   const p = new Promise((resolve, reject) => {
   	setTimeout(() => {
   		resolve()
   	}, 1000)
   }).then(res => {})
   .catch(err => {})
   ```

   注： then方法有两个参数，第一个是成功的回调，第二个为失败的回调，即：

   ```javascript
   .then(res =>{}, err => {})
   ```

   但是最好用catch方法， 因为catch方法会捕获then里的错误，then里有错误程序不会中止。

### Promise.all()

将一组promise再包装成一个promise

```javascript
var pa = Promise.all([p1, p2, p3])
```

特点： 

1. 当所有都fulfilledj时，promise.all才fulfilled
2. 当只有一个rejected时，promise.all就会rejected

## Iterator和for...of

Iterator的3个作用：

1. 为各种数据提供统一的，简便的访问接口
2. 使数据结构的成员能按某种次序排列
3. 主要供for...of用

原生有iterator的数据结构：

`Array`, `Map`, `Set`, `String`, `TypeArray`, `arguments`， `NodeList`

(object是没有的)



### for...of与其他循环的比较

1. for循环写法比较麻烦
2. 数组的forEach: 无法用break;return跳出循环。
3. For...in
   * 数组的键名是数字，而for...in以字符串作为键名（也就是用for...in循环数组，其键名是字符串，笔者被坑过）
   * 不仅可以遍历键名，还可以遍历手动添加的其他键，包括原型链上的
   * 某些情况下，会心任意次序遍历
   * （ for...in主要为对象而设计的）



## 9. Generator与async await

generator是ES6提供的一种异步编程解决方案。使异步写法更像同步。

Async await是ES2017的标准，是generator的一个语法糖。

用法： 

```javascript
async function a() {
	await ...
	console.log(111)
	await ...
}
```

当执行a时，其不会阻塞涵数外面的代码（a内的代码会安顺序执行）

```javascript
console.log('开始')
a()
console.log('a后面')
// 开始 -> a后面 -> 111		
```

## 10. Class

产生的原因： 原ES5语法的没有成型的类的概念。而面向对象编程又离不开类的概念。

ES5定义一个类: 

```javascript
function Point(x, y) {
	this.x = x;
	this.y = y;
}

var p = new Point(1, 2)
```

ES6的class:

```javascript
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}
```

其中： 

1. constructor方法是类的默认方法，通过new 命令生成对象时会调用该方法，如果声明类时没有定义constructor，会默认定义一个空的。
2. 生成实例时必须用new ,不用会报错
3. 不存在变里提升（选定义类，再new实例）

### 类的静态方法：

所有在类中定义的方法都会被实例继承，如果不想被继承，可以在定义时加上static。表示为静态方法。

```javascript
class Foo {
	static match() {}
}
Foo.match()
const f = new Foo()
f.match() // 报错
```

### 类的静态属性

很遗憾，ES6没有给类设静态属性，但是可以用以下方法定义(有提案，写方同静态方法)

```javascript
class Foo {}
 Foo.porp = 1
 // 使用
 Foo.porp // 1
```

### 类的实例属性

类的方法默认被实例继承，那么属性呢？也是继承的，写法如下：

```javascript
class Foo {
	myProp = 111;
	...
}
```

### classr的继承 extends

```javascript
class Point {}
class PointSon extends Point {
	constructor(x, y, z) {
		super(x, y)
		this.z = z
	}
}
```

其中：

1.  super等同于父类的constructor。
2. 子类必须在constructor中调用super， 也就是说用extends去继承一个类，就必须调用这个类（父类）的constructor。是因为子类没有自己的this对象，而是继承父类的this，然后对其进行加工             
3. 如果了类没有写constructor，会默认生成一个，并包含了super(...args)



## 11. Module

一种将程序拆分成一个个小模块的支持，或者说是可以将一个个小模块加入到程序中去。

在ES6的module之前，比较流行的模块加载方案有:CommonJS和AMD，前者用于服务器（node)，后者用于浏览器。

区别：

1. CommondJS和AMD是运行时加载的。
2. module是编译时加载的。
3. CommondJS输出的是值的复制，而ES6输出的是值的引用

**ES6模块默认使用严格模式**：

* 变里必须声明后再使用
* 函数的参数不能有同名属性
* 不能使用width
* 禁止this指向全局对象

### 使用

命令有： `export`、`import` 、`export default`

文件a.js

```javascript
export a = 1
export b = 2
```

相当于

```javascript
const a = 1;
const b = 2;
export  { a, b }
```



在文件b.js中引入

```javascript
import { a, b } from './a.js'
```

引入是重命名

```javascript
import { a as reA, b as reB } from './a.js' // reA reB是重命名的变量
```

整体引入：

```javascript
import * as all from './a.js'
all.a // 1
all.b // 2
// all 相当于{ a, b }
```

**export default默认输出**

export default导出的模块在引入时可以自定义命名

```javascript
export default function() {
	...
}
```

依然用import 引入,但是不用{}，且可以自定义变量名

```javascript
import name from './a.js'
name()
```

**从一个模块导入，然后再导出** 

```javascript
// 写法一：
import { a, b } from './a.js'
export { a, b }
// 写法二： 
export { a, b } from './a.js'
// 改名导出
export { a as reA, b } from './a.js'
// 整体导出
export * from './a.js'
```



### 在浏览器中使用module

将script标签的type设为module即可

```html
<!--  方法一 -->
<script type="module" src="./a.js"></script>
<!-- 方法二 -->
<script type="module">
	import { a } from './a.js'
</script>
```

其中： 

* type="module"的script内写的代码是在当前作用域，不是在全局。
* 模块内自动采用严格模式
* 顶层的this指向undefined
* 同一个模块如棵加载多次，只执行一次



以上是ES6新增语法里在日常开发当中一定会经常用到的东西。ES6的修订对前端开发来说意义重大，其他的还有很多比如二进制数据、Proxy、Reflect、修饰器等，其内容稍深，可以到阮一峰老师博客看看，喜欢看书的可以买他的书《ES6标准入门》超值。