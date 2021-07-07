---
title: rollup介绍
publish: true
date: 2021-04-19
categories:
 - 前端知识
tags:
 - js
author: maYunLaoXi
---

## 简介

Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。

Rollup借鉴ES6的模块标准，可以使你自由、无缝地使用你最喜爱的 library 中那些最有用独立函数，而你的项目不必携带其他未使用的代码。

> 目前各大主流浏览器的最新版本都已经支持ES6的module了。但是rollup是利用`tree-shaking`的方式来构建代码。

[rollup官网： https://rollupjs.org](https://rollupjs.org/guide/en/)

[rollup中文文档：https://www.rollupjs.com/](https://www.rollupjs.com/)

所以可以简单将rollup理解为一个可以从入口文件开始，将各个ES6文件模块中引用到的代码找出来，打包成一个bundle（最终js文件）。其最终的目的是排除了不必要的代码，从而减小代码体积。

##  使用

rollup可以使用命令行开始，也可以写配置文件`rollup.config.js`

```javascript
// rollup.config.js文件的一些配置项
export default {
  input: './src/index.js', // 入口文件
  
  output: {
    name: 'fCom',
    file: './dist/f-com.js',
    format: 'es'
  },
  plugins: [] // 插件的配置，如babel
}
```

更多可以看官网，或者一些用rollup构建的工具库，入门也推荐我写的这个[f-com](https://github.com/maYunLaoXi/f-com)，比较单，也已经在线使用了。

## 优势

rollup对比目前主流的webpack的优势:

* 文档简单，上手快
* 可以一次打包多种模块格式，如commonJs, ES,  AMD, UMD

## 参考
[rollup中文文档：https://www.rollupjs.com/](https://www.rollupjs.com/)
