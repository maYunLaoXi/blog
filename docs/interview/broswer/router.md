---
title: history和hash路由的工作原理
publish: true
date: 2021-04-24 10:00
categories:
 - 前端知识
tags:
 - 浏览器
author: maYunLaoXi
---

### 提问次数： 3

## 前端路由的功能

路由需要实现三个功能：

1. 当刘览器地址变化时，切换页面
2. 点击浏览器 后退 前进按钮，页面内容跟随变化
3. 刷新浏览器，网页加载当前路由对应的内容



## 路由的实现方法

主要是通过监听事件，并用js动态改变网页的内容来实现。共有hash和history两种方式。

1. hash模式：用onhashchange事件监听window.location.hash值的变化
2. history模式：用history.pushState()改变地址栏的路径（不会刷新），window.onpopstate事件监听前进后退。



## 简单示例

1. hash模式

   ```javascript
   window.addEventListener('hashchange', function(e) {
     console.log('hsahchange', e)
   })
   window.location.hash = 'user' // 此时浏览器地址栏将多出 #user的字符并触发onhashchnge事件
   // 之后，浏览器后退按钮可用，并且点击后退按钮可以触发onhashchagne事件及改变浏览器地址栏#后面的值
   ```

2. history模式

   ```javascript
   // 浏览器地址栏后会拼入/test 并带入参数{ name: 'test' }到新页面
   history.pushState({ name: 'test' }, null, '/test')
   ... 更改页面的js
   
   // 下面是前进后退
   window.addEventListener('popstate', function(e) {
     ... 更改页面的js
   })
   
   ```

   history的一些api

   history.back() 后退

   history.go() 前进或后退

   history.forward() 前进

## 前端路由提问

### 什么是前端路由？

前端路由就是把不同路由对应不同的内容或页面的任务交给前端来做，之前是通过服务端根据 url 的不同返回不同的页面实现的。

### 什么时候使用前端路由?

在单页面应用，大部分页面结构不变，只改变部分内容的使用

### 前端路由有什么优点和缺点?

优点:用户体验好，不需要每次都从服务器全部获取，快速展现给用户

缺点:单页面无法记住之前滚动的位置，无法在前进，后退的时候记住滚动的位置