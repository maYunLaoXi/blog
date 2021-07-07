---
title: cookie、localStorage和sessionStorage的区别
date: 2021-04-15
categories:
 - 前端知识
tags:
 - js
author: maYunLaoXi
---

### 次数： 2

浏览器常用的存储技术是`cookie、localStorage、sessionStorage`

## cookie

cookie最开始是服务端用于记录用户状态的一种方式，由服务器设置，在客户端存储，然后每次发起同源请求时，发送给服务器端。cookie 最多能存储 4 k 数据，它的生存时间由 expires 属性指定，并且 cookie 只能被同源的页面访问共享。

## sessionStorage

sessionStorage是HTML5提供的一种本地存储的方式。代表的是一次会话中所保存的数据。一般能存5M或更大的数据，并且当窗口关闭进就失效，还有一个特点是只能被同一个窗口的周源页面访问。

## localStorage

localStorage也是HTML5提供的一种本地存储的方式。除非手动删除它，不然它不会失效，并且是只能被同源页面访问，大小也有5M或更多。

**参考**
[《请描述一下cookies，sessionStorage和localStorage的区别？》](https://segmentfault.com/a/1190000017423117)