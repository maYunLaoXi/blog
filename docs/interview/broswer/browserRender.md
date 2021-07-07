---
title: 浏览器渲染机制
date: 2021-03-31
categories:
 - 前端知识
tags:
 - 浏览器
author: maYunLaoXi
---

## 概念
HTML文本，CSS文本，DOM，CSSOM，渲染树

## 渲染的大致过程

1. HTML和CSS经过各自解析，分别生成DOM树和CSSOM树
2. DOM和CSSOM 合并成为渲染树
3. 跟椐渲染树进行布局
4. 调用GPU进行绘制，最后显示在屏幕上

###  DOM的生成

HTML文件是通过字节流的方式被浏览器接收，然后将字节流解释为DOM才能被浏览器识别。HTML解释器（HTMLParser）负责将字节流解释为DOM。且是一边下载一边解释已下载的字节流。

解释器会创建一个Token栈，从上到下将tag放入栈中，其中tag又分为startTag和endTag，每凑一对完整的tag就会将这对tag从栈中弹出。（这个过程一边入栈出栈，一边生成DOM)

文本直生成节点加入DOM

#### DOM生成过程中遇到script脚本

* 当HTML解释器生成DOM时遇到script脚本，会停止解释，等待script脚本的执行结束才会断续解释。

  ``` HTML 
  <html>
    <body>
      <div id="div1">
        111
      </div>
      <script>
        div1.innerText = 'new text'
      </script>
      <div>
        2222
      </div>
    </body>
  </html>
  ```

  上面的文档，当解释到div 111时停止，等执行script里的代码后，其内容已经变为`new text`，再向下解释div 222。

  因此，script中javaScript代码的下载和执行会阻塞DOM的生成。

* 当遇到src引用外部文件的script标签时

  ```html
  <!-- 第一种情况 -->
  <script src="foo.js"></script>
  <!-- 第二种情况 -->
  <script src="foo2.js" defer></script>
  <!-- 第三种情况 -->
  <script src="foo3.js" async></script>
  ```

  其中第一种情况，会等待下载，第二种和第三种都是异步加载（也就是在下载的过程中， HTML解释器还在继续解释 DOM）

  `defer`与`async`的区别：

  * async是 html5加入的，defer是html4加入的
  * async下载完后立即执行（onload事件之前），defer下载完后按照出现的顺序执行（如果有多个）
  * defer会在DOMContentLoaded事件之前执

  因此要注意的问题：async可能不会按照顺序执行；如果同时有async和defer，只有async有效，除非浏览器的版本不兼容async

* 浏览器遇到`script`对CSSOM的执行

  我们知道， js脚本是可以修改样式的。所以在执行js脚本之前，还要等待css文件的下载完成并生成对应的CSSOM后才会执行js。

##### 总结：

javaScript会阻塞DOM的生成，而样式又会阻塞javaScript的执行。

### CSSOM的生成

HTML解释器中有一个预解析线程，当遇到css或js外部文件时，会提前发起请求下载对应的文件，如：

``` html 
<link href="theme.css" rel="stylesheet">
```

当然，如果同时又有script文件需要下载，也会同时发送请求，但无论css还是js谁先下载完成，都要等待CSSOM渲染完成才会执行js。

 CSSOM提供的目的：

1. 提供给js操作样式的能力
2. 为布局树的合成提供基础的样式。

#### 显示器显示图像的原理

显示器会跟据刷新率（也就是平常听的60Hz、120Hz...)，比如60Hz的显示器每秒会从显卡的前缓冲区读取60次图片。而显卡的作用就是将浏览器生成的网页图片存在缓冲区。

####  css由文本转换成样式表

网络传过来的 css共有三种方式:

```html
<head>
  <link href="./index.css" rel="stylesheet">
  <style>
    .text{
      color: red;
    }
  </style>
</head>
<body>
  <title style="color: red;">title</title>
</body>
```

分别为： link引用的样式文件；style标签的样式；行内样式。

 css文件无法被浏览器直接识别，浏览器会将其转换为可识别的格式`styleSheets`。（在控制台打印document.styleSheets可看到）。

### DOM和CSSOM合并成为渲染树

其实就是在生成 DOM树后，跟据css样式表（层叠样式），计算出DOM树中所有节点的样式。

DOM树中会有很多在页面里其实不用展示的节点，如`head`标签，`display: none`的元素。所以在显示前还要创建一个只包含可见元素的树，称为布局树。



复习一下以上的过程： 

在HTML页面内容被提交给渲染引擎之后，渲染引擎首先将HTML解析为浏览器可以理解的DOM；然后根据CSS样式表，计算出DOM树所有节点的样式；接着又计算每个元素的几何坐标位置，并将这些信息保存在布局树中。

最后由浏览器开始制作图层、绘制、光栅化、合成和显示。

参考： [https://blog.poetries.top/browser-working-principle/](https://blog.poetries.top/browser-working-principle/)

下面介绍一下前端操作最密切相关的两个概念： 回流和重绘

### 回流（reflow, 重排）和重绘（repaint）

#### 提问次数： 1

#### 回流
当DOM的变化影响了元素的几何信息(元素的的位置和尺寸大小)，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排。

重排也叫回流，简单的说就是重新生成布局，重新排列元素。

**下面情况会发生重排：**

- 页面初始渲染，这是开销最大的一次重排
- 添加/删除可见的DOM元素
- 改变元素位置
- 改变元素尺寸，比如边距、填充、边框、宽度和高度等
- 改变元素内容，比如文字数量，图片大小等
- 改变元素字体大小
- 改变浏览器窗口尺寸，比如resize事件发生时
- 激活CSS伪类（例如：`:hover`）
- 设置 style 属性的值，因为通过设置style属性改变结点样式的话，每一次设置都会触发一次reflow
- 查询某些属性或调用某些计算方法：offsetWidth、offsetHeight等，除此之外，当我们调用 `getComputedStyle`方法，或者IE里的 `currentStyle` 时，也会触发重排，原理是一样的，都为求一个“即时性”和“准确性”。

重排有分全局范围的和局部范围的。局部范围如一个盒子宽高固定，只改变其子元素的尺寸等。



#### 重绘

当一个元素的外观发生改变，但没有改变布局,重新把元素外观绘制出来的过程，叫做重绘。

**常见的引起重绘的属性：**

| 属性：          | --               | --                  | --                |
| --------------- | ---------------- | ------------------- | ----------------- |
| color           | border-style     | visibility          | background        |
| text-decoration | background-image | background-position | background-repeat |
| outline-color   | outline          | outline-style       | border-radius     |
| outline-width   | box-shadow       | background-size     |                   |

#### 如何减少回流
1. 使用 transform 替代 top 
2. 不要把节点的属性值放在一个循环里当成循环里的变量
3. 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局
4. 把 DOM 离线后修改。如:使用 documentFragment 对象在内存里操作 DOM
5. 不要一条一条地修改 DOM 的样式。与其这样，还不如预先定义好 css 的 class，然后修改 DOM 的 className。

参考： [重排(reflow)和重绘(repaint)](https://juejin.cn/post/6844904083212468238)

