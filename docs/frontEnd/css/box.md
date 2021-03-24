---
title: css盒子模型
date: 2021-03-24
categories:
 - 前端
tags:
 - css
author: maYunLaoXi
---

### 盒子模型的分类
  1. 标准盒模型
  2. IE盒模型
  其中：标准盒模型width = content; IE盒模型width = content + padding + border

### css设置各种模型

  *box-sizing*
  1. box-sizing: content-box; 标准盒模型
  2. box-sizing: border-box; IE盒模型

### js获取元素的宽高
  1. **dom.style.width/height** 只能取到行内样式的宽和高，style标签中和link外链的样式取不到。
  2. **dom.currentStyle.width/height** 取到的是最终渲染后的宽和高，只有IE支持此属性。
  3. **window.getComputedStyle(dom).width/height** 同（2）但是多浏览器支持，IE9以上支持。
  4. **dom.getBoundingClientRect().width/height** 也是得到渲染后的宽和高，大多浏览器支持。IE9以上支持，除此外还可以取到相对于视窗的上下左右的距离

### 外边距重叠问题

当两个垂直外边距相遇时，他们将形成一个外边距，合并后的外边距高度等于两个发生合并的外边距的高度中的较大者。

**注意**：只有普通文档流中块框的垂直外边距才会发生外边距合并，行内框、浮动框或绝对定位之间的外边距不会合并。

### BFC
* 定义： Block Fromatting Contexts(块级格式化上下文)
* 基本特点： 具有BFC的元素可以看作是隔离了的独立容器，容器里的元素不会在布局上影响到外面的元素。并且BFC还有普通容器所没有的一些特点。
* 触发条件：（以下任一条）
  1. body根元素
  2. 浮动（flow 除none以外的其他值）
  3. 绝对定位: position: absolute / fixed
  4. display: inline-block / table-cell / flex
  5. overflow除visiable以外的值（hidden / scroll / auto)
* 表现：
  1. 同一个BFC下margin会重叠
  2. BFC可以包含浮动的元素（消浮动)