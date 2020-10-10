---
title: 用rollup和jest进行前端工具库构建与测试的babel配置
date: 2020-10-10
categories:
 - 前端
tags:
 - babel
 - javaScript
 - 测试
 - jest
author: maYunLaoXi
---

最近在写一个前端工具库，用到rollup构建，jest测试。在配置babel的时候踩了好多坑。分享一下。

惯例先上搬砖图：

[![0yDma8.md.jpg](https://s1.ax1x.com/2020/10/10/0yDma8.md.jpg)](https://imgchr.com/i/0yDma8)

本库基本的意路就是用新的语法写，然后用babel 转换成`umd` `es` `cjs`文件。由于转换后的文件是运行在浏览器端，而`jest`测试工具是运行在node端。两者在babel配置时产生的冲突。

由于笔者对babel研究不算深入，文档体系也比较大。本文只着重说说实现方式。

## 浏览器可用的babel配置
由于工具库运用了大量的`import` `export` `export default` 等ES6模块化的语法。目前（ babel7）对新语法的转换细分为很多个小的模块， 比如如果使用了`class`那么就引用class对应的转换，而不会引用多余的其他支持。
但是，rollup中文网上对babel介绍的文档有点旧。 比如说`rollup-plugin-babel`这个插件就已经合并了`external-helpers`， 无需再在babelrc中配置。

(注： 官网介绍是方法是用`babel-preset-latest`与`external-helpers`搭配使用)

同时，babel7推荐使用`babel.config.js`来代替`babelrc`。一开始我觉得没有关系，能读取到babelrc就可以了，后来经过研究，发现两者的区别：
1. babelrc是json文档，而babel.config.js是一个js文件。
2. babel.config.js最大的好处就是可以执行一些方法来更改配置。

rollup文档介绍的方法：
```javascript
{
  "presets": [
    // 这里是`babel-preset-latest`的配置
    ["latest", {
      "es2015": {
        "modules": false
      }
    }]
  ],
  // external-helpers已弃用
  "plugins": ["external-helpers"]
}
```

而新的适应浏览器配置为：

```javascript
{
	presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        useBuiltIns: "usage",
        corejs: "2"
      }
    ]
  ],
}
```

其中：  useBuiltIns的值为usage则设定为跟据需引用转换。

## node可用的babel配置

```json 
{
	presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ]
  ]
}	
```

对于上述的浏览器和node对应的配置，刚好js文件就可以动态的更改。当在node端执行test时用node配置，而当打包生成浏览器文件时执行第一个配置。

如下： 

```javascript
// babel.config.js
module.exports = function(api) {
  // process.env.NODE_ENV
  console.log('env', process.env.NODE_ENV)
  const isTest = api.env('test')
  const presets =  [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ]
  ]
  const dom = {
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false,
          useBuiltIns: "usage",
          corejs: "2"
        }
      ]
    ],
    ignore: ["./node/*.js"]
  }
  let config = isTest ? { presets } : dom
  return config
}
```

大功告成！

## 最后
上文工具库地址: [https://github.com/maYunLaoXi/f-com](https://github.com/maYunLaoXi/f-com)

欢迎一起完善

博客地址： [思否](https://segmentfault.com/u/mayunlaoxi)

个人网站： [http://www.yingyinbi.com/](http://www.yingyinbi.com/)



**参考资料： **

[rollup](https://www.rollupjs.com/guide/tools/#babel)

[babel7](https://babeljs.io/docs/en/babel-preset-env)

[jest](https://www.jestjs.cn/docs/getting-started#%E4%BD%BF%E7%94%A8-babel)

