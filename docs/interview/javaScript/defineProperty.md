---
title: Object.defineProperty
date: 2021-04-12
categories:
 - 前端知识
tags:
 - css
author: maYunLaoXi
---

## 定义

> Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

## 语法

> Object.defineProperty(obj, prop, descriptor)

其中`descriptor`包括： `configurable`, `enumerable`, `value`, `writable`, `get`, `set`。

## 两个作用
1. 用于数据描述符：
  可以用的属性： `configurable`, `enumerable`, `value`, `writable`。（`get`, `set`不可设）
2. 用于存取描述符：  `configurable`, `enumerable`, `get`, `set`。（`value`, `writable`不可设）