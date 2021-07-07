---
title: promise的实现
publish: false
date: 2021-04-19
categories:
 - 前端知识
tags:
 - js
author: maYunLaoXi
---

[Promise/A+](https://promisesaplus.com/)

## Promise简介

1. Promise有三种状态：pending（请求）、fulfilled（完成）、rejected（失败）。
2. Promise的状态只能由pending变为fulfilled，或者从pending变为rejected，一但改变就没有再有变化。
3. 支持异步链式调用，执行then方法的回调，then方法接受两个参数，promise.then(onFulfilled, onRejected), 如果onFulfilled或onRejected不是函数则忽略。如果是函数，则调用onFulfilled时将promise的值作为第一个参数，调用onRejected时用失败的reason作为第一个参数。
4. Promise是接受的参数是一个涵数，会立即执行，在遇到resolve或reject时会将状态改变（fulfilled或rejected)，并且resolve/reject只会执行一次。剩下的代码还会继续执行。




see: [https://mp.weixin.qq.com/s/06Qg9FG4PSzuxdipbDAa6Q](https://mp.weixin.qq.com/s/06Qg9FG4PSzuxdipbDAa6Q)
