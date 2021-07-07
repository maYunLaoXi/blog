---
-title: 浏览器的事件
publish: true
date: 2021-04-20
categories:
 - 前端知识
tags:
 - 浏览器
author: maYunLaoXi
---

## 事件流

> 在第四代 Web 浏览器(IE4 和 Netscape Communicator 4)开始开发时，开发团队碰到了一个有意思 的问题:页面哪个部分拥有特定的事件呢?要理解这个问题，可以在一张纸上画几个同心圆。把手指放 到圆心上，则手指不仅是在一个圆圈里，而且是在所有的圆圈里。两家浏览器的开发团队都是以同样的 方式看待浏览器事件的。当你点击一个按钮时，实际上不光点击了这个按钮，还点击了它的容器以及整 个页面。
>
> 事件流描述了页面接收事件的顺序。结果非常有意思，IE 和 Netscape 开发团队提出了几乎完全相 反的事件流方案。IE 将支持事件冒泡流，而 Netscape Communicator 将支持事件捕获流。
>
> (《红宝书》)

### 事件冒泡

IE 事件流被称为事件冒泡，这是因为事件被定义为从最具体的元素(文档树中最深的节点)开始触 发，然后向上传播至没有那么具体的元素(文档)。也就是当先触发div的事件（被点击的元素），再会触发body、html的事件。

1. div
2. body
3. html
4. Document

### 事件捕获

事件捕获的意思是最不具体的节 点应该最先收到事件，而最具体的节点应该最后收到事件。在事件捕获中，`click`事件首先由`document`元素捕获，然后沿 DOM 树依次向下传播，直至到达实际的目标元素\<div\>： document - html - body - div。

事件捕获为提前拦截事件提供了可能。

1. document
2. html
3. body
4. Div

### DOM事件流

DOM2 Events 规范规定事件流分为 3 个阶段:事件捕获、到达目标和事件冒泡。（到达目标后，目标事件只触发一次，在捕获阶段不触发。但是大多数浏览器都有两次机会，分别是捕获阶段和冒泡阶段）

1. document
2. html
3. body
4. div(目标元素)
5. body
6. html
7. Document

## DOM添加事件的方法

1. HTML事件

   添加在HTML里，以on开头，可以是代码，也可以是一个方法（要执行，即调用函数）,同时可以访问所有全局变量

   ```html
   <div onclick="console.log(a, b)">
     clickEvent
   </div>
   <!-- 必需写成event (e, ev都是undefined) -->
   <div onclick="handleClick(event)">
     clickEvent
   </div>
   <script>
     var a = 'a'
     let b = 'b'
   	function handleClick(e) {
       console.log(e)
     }
   </script>
   ```

2. DOM0 事件

   在 JavaScript 中指定事件处理程序的传统方式是把一个函数赋值给(DOM 元素的)一个事件处理程 序属性（赋值法）。

   ```html
   <div id="dom0">
     dom0Click
   </div>
   <script>
     // 可以使用e / event / ev 了表示事件对象了
   	dom0.onclick = function(e) {
       //  this是元素本身
       console.log(this, e)
     }
   </script>
   ```

   缺点：

   这里先从文档中取得按钮，然后给它的 onclick 事件处理程序赋值一个函数。注意，前面的代码 在运行之后才会给事件处理程序赋值。因此如果在页面中上面的代码出现在按钮之后，则有可能出现用 19 户点击按钮没有反应的情况。(事件还没有添加)

   移除事件：

   ```javascript
   dom0.onckick = null
   ```

3. DOM2 事件

   DOM2 Events 为事件处理程序的赋值和移除定义了两个方法:addEventListener()和 remove- EventListener()。这两个方法暴露在所有 DOM 节点上，它们接收 3 个参数:事件名、事件处理函 数和一个布尔值，true 表示在捕获阶段调用事件处理程序，false(默认值)表示在冒泡阶段调用事 件处理程序。

   ```html
   <div id="dom2">
     clickDom3
   </div>
   <script>
   	dom2.addEventListener('click', function(e) {
       console.log(e )
     }, false)
   </script>
   ```

   注意：

   1. addEventListener与removeEventListener用配合用时，处理函数应为同一个（也就是不能使用匿名函数）

   以下方式remove无效

   ```javascript
   dom2.addEventListener('click', function(e) {
     console.log(e)
   })
   
   // 无效
   dom2.removeEventListener('click', function(e) {
     console.log(e)
   })
   ```

   以下有效

   ```javascript
   function handler(e) {
     console.log(e)
   }
   dom2.addEventListener('click', handler)
   // 有效
   dom2.removeEventListener('click', handler)
   ```

   2. 可以添加多个事件，按添加顺序执行

## 事件对象event

>  在 DOM 中发生事件时，所有相关信息都会被收集并存储在一个名为 event 的对象中

event的一些属性

* Bubbles 事件是否冒泡
* target 事件目标（一个元素）
* curretnTarget 当前处理程序所在的元素（一个元素）
* preventDefault() 取消事件的默认行为
* stopPropagation() 用于取消所有后续事件捕获或事件冒泡。只有 bubbles为 true 才可以调用这个方法

关于target与currentTarget的区别：
`curretnTarget` 当前处理程序所在的元素，也就是绑定当前事件的元素。`target` 触发事的元素（可以是子元素）。
下面以body和div为例：

```html
<body onclick="colsone.log(event.target, event.currentTarget)">
  body
  <div onclick="console.log(event.target, event.currentTarget)">
   	I'm div, click me
  </div>
</body>
```

当点击div时，会先触发div的click事件，然后冒泡触发body的click事件，由于事件是由div触发的，

在div的click中:

1. target是div
2. currentTarget也是div

在body的click中：

1. target是div
2. currentTarget是body

第二种情况，当div没有click事件时（这种情况叫事件委托）

```html 
<body onclick="colsone.log(event.target, event.currentTarget)">
  body
  <div>
   	I'm div, click me
  </div>
</body>
```

同样是点击div，些时会触发body的click事件，些时

1. target是div(由于是点击div触发的)
2. currentTarget是body