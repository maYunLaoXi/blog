---
title: 手写节流和防抖
date: 2021-03-30
categories:
 - 前端知识
tags:
 - js
author: maYunLaoXi
---

### 提问次数： 2
## 防抖
防抖： 一定时间内大量的触发一个函数，只会执行一次（最后一次）。 实现原理：用setTimeout来延后执行，wait秒内如果有触发，就清除上一个timeout，新timeout从重进入执行栈。最后注意this的问题就行。
```
// 第一版
function debounce(fn, wait) {
  var timer
  return function() {
    clearTimeout(timer)
    timer = setTimeout(fn, wait)
  }
}
// this问题

function debounce(fn, wait) {
  var timer
  return function() {
    var that = this

    clearTimeout(timer)
    timer = setTimeout(function() {
      fn.apply(that)
    }, wait)
  }
}
// 传参问题
function debounce(fn, wait) {
  var timer
  
  return function() {
    var that = this
    var args = arguments

    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(that, args)
    }, wait);
  }
}
```

## 节流
节流: 间隔一段时间执行一次，wait执行一次， 在wait其间无论触发多少都不执行
```
function throttle(fn, wait) {
  var time
  return function() {
    var that = this
    var args = arguments

    // 先执行第一次
    if (!time) {
      fn.apply(that, args)
      time = +new Date()
    } else {
      var now = +new Date()
      if (now - time >= wait) {
        time = now
        fn.apply(that, args)
      }
    }
  }
}
```