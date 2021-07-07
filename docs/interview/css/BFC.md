---
title: BFC：块格式化上下文
date: 2021-04-11
categories:
 - 前端知识
tags:
 - css
author: maYunLaoXi
---
### 提问次数： 3
## 定义

BFC(Block Formatting Context)：块级格式化上下文。是页面中的一块渲染区域，有自己的一套渲染规则，不会受外界影响。

## 触发BFC的条件
* 根元素（<html>)(<body>好像也是)
* 浮动元素：`float`为`none`以外的值
* 绝对定位元素：`position`为`absolute`,`fixed`
* `display`为`inline-block`, `table-cell`, `flex`
* `overflow`除`visible`以外的值（`hidden`, `scroll`, `auto`)

## 应用/作用

1. 同一个BFC下不同元素的上下margin会重叠。

   ```html
   <div class="content">1</div>
   <div class="content">2</div>
   ```

   上面两个div如果1有margin-bottom，2有margin-top，那么会有重叠的问题。

   如果将它们放在不同的BFC中

   ```html
   <div class="content">1</div>
   <div class="bfc">
     <div class="content">2</div>
   </div>
   ```

   注意是将其放在不同的BFC中而不是将其变为BFC。

2. BFC清除浮动

   ```html
   <div>
     <p style="flow: left">
       float
     </p>
   </div>
   ```

   将div设为BFC

   ```html
   <div style="overflow: scroll">
     <p style="flow: left">
       float
     </p>
   </div>
   ```

3. 可以实现一个两列自适应布局

   左边盒子设置flow: left;右为盒子设为BFC

   ```html
   <div style="flow: left">
     左盒子
   </div>
   <div style="overflow: scroll">
     右盒子
   </div>
   ```



参考

* [https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

