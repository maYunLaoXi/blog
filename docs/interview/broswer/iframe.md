---
title: iframe的缺点
date: 2021-04-15
categories:
 - 前端知识
tags:
 - 浏览器
author: maYunLaoXi
---

### 提问次数： 1

iframe 元素会创建包含另外一个文档的内联框架（即行内框架）。

主要缺点有：
1. iframe 会阻塞主页面的 onload 事件。window 的 onload 事件需要在所有 iframe 加载完毕后（包含里面的元素）才会触发。在 Safari 和 Chrome 里，通过 JavaScript 动态 设置 iframe 的 src 可以避免这种阻塞情况。
2. 搜索引擎的检索程序无法解读这种页面，不利于网页的 SEO 。
3. frame 和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的 并行加载。
4. 浏览器的后退按钮失效。
5. 小型的移动设备无法完全显示框架。

详细的资料可以参考： [《使用 iframe 的优缺点》](https://blog.csdn.net/yintianqin/article/details/72625785) [《iframe 简单探索以及 iframe 跨域处 理》](https://segmentfault.com/a/1190000009891683)