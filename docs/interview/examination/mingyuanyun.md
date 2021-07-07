---
title: 明源云在线笔试题
date: 2021-04-15
categories:
 - 前端知识
 - 面试题
tags:
 - js
author: maYunLaoXi
---

> 在线的题库随机出的题，可能每个人考都不一样，6道题，1.5小时

1. **（10分）完成左中右布局。要求：**

   1) 左固定200px，中间自适应，右边固定100px;

   2) 中间部分优先渲染

2. **（15分）请用css3画出一个扇形，并说出其实现原理**

3. **（15分）完成函数computed, multiply, add 满足以下功能**

   1) computed(multiply(num2), add(num3))(num1) // 等于num1 - num2 + num3

   2) computed(add(num2), multiply(num3), add(num4))(num1) // 等于num1 + num2 - num3 + num4

4. **（20分）实现一个图片资源列表预加载功能，要求： 使用Promise；允许同时预加载1个以上（naxNum）；若某个失败，记录下来；全部完成，输出成功个数，失败个数。**

   Function preload(list, maxNum = 1) {}

5. **(20分)用正则表达式解析以下URL地址，并获取所需参数，满足以下要求**：

   1) 规则： http://m.mycaigou.com/region/{省份简写}-c{城市id}/{模块}/p{页}

   2) 解析后会得到{}里的参数

   3) 能应用到以下 URL;

   https://m.mycaigou.com/region/gd/supplier

   https://m.mycaigou.com/region/gd-c223/supplier

   https://m.mycaigou.com/region/gd-c223/bidding

   https://m.mycaigou.com/region/gd-c223/supplier/p2

   > 网友给的答按： /https:\/\/m\.mycaigou\.com\/region\/(\w{2})(?:-c(\d{3}))?\/(\w+)(?:\/p(\d+))?/

6. **(20分)实现Storage (localStorage封装扩展)**

   要求：

   1) 支持设置命名空间，含默认命名空间： 如：

   ​	const storage = new Storage('ycg');

   ​	storage.get('version') // => 1.0.0

   2) 支持各种格式的数据类型：

   ​	const storage = new Storage();

   ​	storage.set('userInfo', { name: 'ycg' }) // => true

   3) 支持设置过期时间（最少到秒级）

   ​	const storage = new Storage()

   ​	storage.set('token', '123456789', 10 * 60)

   ​	// 10分钟后

   ​	storage.get('item') // => ''