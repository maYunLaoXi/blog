---
title: 同源策略与跨域触决方案
date: 2021-04-15
categories:
 - 前端知识
tags:
 - 浏览器
author: maYunLaoXi
---

## 什么是浏览器的同源政策？

同源策略/SOP（Same origin policy）是一种约定，由Netscape公司1995年引入浏览器，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSFR等攻击。

一般针对于js,在一个域下的js在未经允许的情况下无法访问另一个域的内容。同源指的是协议、域名和端口号，任何一个不一至都会构成跨域。

同源策略主要限制在以下三个方面：

1. 当前域下的js脚本不能访问其它域的cookie、localStorage和indexDB
2. 当前域下的js不能访问其它域的DOM节点
3. 当前域下限制发起跨域Ajax请求

## 跨域解决方案

1. document.domain + iframe
2. Location.hash + iframe
3. Window.name + iframe
4. postMessage + iframe
5. jsonp
6. CORS
7. nginx反向代理
8. nodejs中间件
9. webSocket
