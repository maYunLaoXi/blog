---
title: javaScript继承
date: 2021-03-30
categories:
 - 前端
tags:
 - js
author: maYunLaoXi
---

### 原型
> 我个创建的每一个函数都有一个prototype（原型）属性， 这个属性是一个指针，指向一个对象。而这个对象的作用是包含由特定类型的所有实例共享的属性和方法。使用原型的好处是可以让所有实例共享它所包含所有属性和方法。换句话说，不必在构造函数中定义对象的实例的信息，而是可以将这些信息添加到原型对象中。（红宝书）

### 继承的6种方法
继承分ES6和ES5的方法，ES6的方法很简单，就是`extends`，但是只知道这个方法是不合格的。下面说说ES5的方法，共有：
原型链继承、借用构造函数继承、组合式继承、寄生式继承、继生组合式继承

1. 原型链继承

   让子类的原型等行父类的实例，当子类实例找不到对应的属性和方法时，就会向父类实例上找。
```javascript
function Parent() {
  this.name = 'parent'
}
Parent.prototype.sayName = function() {
  console.log(this.name)
}
function Child() {
  this.name = 'child'
}
Child.prototype = new Parent()
// 最后可以将constructor改回来
Child.prototype.constructor = Child
```

​	原型链继承的缺点：

* 所有子类的实例的原型都是引用同一个Parent的实例，当其中一个子类实例将原型中的引用类型数据更改时，其他实例对应的数据也会改变
* 在创建子类实例时不能向Parent传参

2. 借用构造函数

   在子类的构造函数中调用父类构造函数（用call / apply将调用的this指向子类实例），这样既避免了实例之间共享同一个原型，又可以向父类构造函数传参。解决了原型链继承的两个问题。

   ```javascript
   function Parent(name, age) {
     this.style = [1, 2, 3]
     this.name = name
     this.age = age
   }
   Parent.prototype.sayStyle = function() {
     	console.log(this.style)
   }
   function Child(name, age) {
     Parent.call(this, name, age)
   }
   let child = new Child('child', 11)
   child.style // [1, 2, 3]
   child.name // 'child'
   child.sayStyle() // 报错 is not a function， 因为子实类无法继承到Parent原型上的方法
   ```

   借用构造函数的缺点

   * 继承不到父类原型上的属性和方法
   * 方法都在构造函数中定义， 每次创建都会生成一遍方法

3. 组合继承

   将原型链继承和借用构造函数继承（经典继承）组合起来。

   ```javascript
   function Parent(name) {
     this.style = [1, 2, 3]
     this.name = name
   }
   Parent.prototype.sayStyle = function() {
     console.log(this.style)
   }
   function Child(name) {
     Parent.call(this, name)
   }
   Child.prototype = new Parent()
   Child.prototype.constructor = Child
   let child = new Child('child')
   ```

4. 寄生式继承

   创建一个实现继承的函数，以某种方式增强对象，然后返回这个对像.

   ```javascript
   function createAnother(obj) {
     const clone = Object(obj)
     clone.sayHi = function() {
       console.log('hi')
     }
     return clone
   }
   ```

5. 寄生组合式继承

   解决组合继承会调用两次父类构造函数的问题（效率问题）， 找一个中转的空函数来执行

   ```javascript
   function Parent(name) {
     this.name = name
     this.style = [1, 2, 3]
   }
   Parent.prototype.say = function() {
     console.log(this.style)
   }
   function Child(name, age) {
     Parent.call(this, name)
     this.age = age
   }
   
   // 中转的空函数
   function F() {}
   F.prototype = Parent.prototype
   Child.prototype = new F()
   Child.prototype.constructor = Child
   ```

   