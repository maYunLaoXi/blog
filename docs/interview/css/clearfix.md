---
title: 消除浮动的方法
date: 2021-04-27 10:00
publish: false
categories:
 - 前端知识
tags:
 - css
author: maYunLaoXi
---

## 为什么要清除浮动

清除浮动是为了解决子元素浮动而导致父元素高度塌陷的问题。浮动的元素，高度会塌陷，而高度的塌陷使 我们页面后面的布局不能正常显示。

## 清除浮动的两大方式

### 使用 clear 属性清除浮动

使用 clear 属性清除浮动，其语法如下: 

`clear:none|left|right|both`

如果单看字面意思，clear:left 应该是“清除左浮动”，clear:right 应该是“清除右浮动”的意思， 实际上，这种解释是有问题的，因为浮动一直还在，并没有清除。
官方对 clear 属性的解释是:“元素盒子的边不能和前面的浮动元素相邻。”，我们对元素设置clear 属性是为了避免浮动元素对该元素的影响，而不是清除掉浮动。

还需要注意的一点是 clear 属性指的是元素盒子的边不能和前面的浮动元素相邻，注意这里“前面的”3 个字，也就是 clear 属性对“后面的”浮动元素是不闻不问的。考虑到 float 属性要么是 left，要么是 right，不可能同 时存在，同时由于 clear 属性对“后面的”浮动元素不闻不问，因此，当 clear:left 有效的时候，clear:right 必定无效， 也就是此时clear:left 等同于设置 clear:both;同样地，clear:right 如果有效也是等同于设置clear:both。由此可见， clear:left 和 clear:right 这两个声明就没有任何使用的价值，至少在 CSS 世界中是如此，直接使用 clear:both 吧。

* 一般使用伪元素的方式清除浮动
  ```css
  .clear::after{
    content:'';
    display:table; //也可以是'block'，或者是'list-item'
    clear:both;
  }
  ```
* 添加一个子元素设置clear: both
  ```html
  <div class="clearfix"></div>
  .clearfix{
    clear: both;
  }
  ```

clear 属性只有块级元素才有效的，而::after 等伪元素默认都是内联水平，这就是借助伪元素 清除浮动影响时需要设置 display 属性值的原因。

## 触发父元素的BFC消除浮动

因为 BFC 元素不会影响外部元素的特点，所以 BFC 元素也可以用来清除浮动的影响，因为 如果不清除，子元素浮动则父元素高度塌陷，必然会影响后面元素布局和定位，这显然有违 BFC 元素的子元素不会影响外部 元素的设定。

```css
/* 触发父元素BFC */
.parent {
  overflow: hidden;
  /* float: left; */
  /* position: absolute; */
  /* display: inline-block */
  /* 以上属性均可触发BFC */
}
```

详细： [BFC：块格式化上下文](./BFC.md)

