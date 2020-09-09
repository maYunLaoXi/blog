---
title: 前端程序员如何利用vuePress和gitHub Actions快自动发布个人博客
date: 2020-08-26
categories:
 - 前端
tags:
 - es6
 - javaScript
 - gitHub
author: maYunLaoXi
---

前段时间因为写一个个人的小程序，买了一个腾讯的服务器，还有一个域名，但是小程序只是用了域名来做CDN加速，（因为域名备案要有服务器，！！）



小程序已上架（先推一波： [gitHub代码地址](https://github.com/maYunLaoXi/yingyinbiclound))



服务器不用也是浪费了，所以又开始折腾写一个人人博客网站



对于一个前端而言，写前端页面不是一件难事，只要花点时间就可以了。而如何在服务器上发布只自己的网站却不是所有前端的同学都玩的溜的。

本文就选用我觉得比较简便的法教一下大家如何写，以及用`持续集成`发布自己的个个博客网站。

用到的东西：

`vuePress`、服务器和域名、`gitHub仓库`



先看网站效果[www.yingyinbi.com/](http://www.yingyinbi.com/)

## vuePress

vuePress（[官网](https://vuepress.vuejs.org/zh/)）是一个简洁至上、vue驱动、高性能的静态网站生成器。

其实就是用markdown来写博客。

跟椐官网一点一点的搭好博客的项目后就可以按以下的方法发布自己的网站了

当然你也可以参考一下我写的：

[作者blog源码](https://github.com/maYunLaoXi/blog)

## Node.js写个简单的后台

很多前端都会node.js，所以用node来写后台比较方便。

代码在[这里vuePress-server](https://github.com/maYunLaoXi/vuePress-server)

基础薄弱的可以拿来看看，直接用也可以（求赞）

其实就只有几行代码

```javascript

const Koa = require('koa')
const app = new Koa
const static = require('koa-static')
const path = require('path')

app.use(static(
  path.join(__dirname, '../blog')
))

app.listen(80, () => {
  console.log('success')
})
```



