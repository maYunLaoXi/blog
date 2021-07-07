---
title: js数组去重，究竟谁更优？
date: 2021-04-25 10:00
categories:
 - 前端知识
tags:
 - js
author: maYunLaoXi
---

### 提问次数： 2

### 搬砖图
![](https://gitee.com/maYunLaoXi/image/raw/master/blog/2021/4B6F8BC9-DB55-4E1E-B048-67C96D5962AB_1_105_c.jpeg)

## 原始方法（两个循环）

```javascript
const arr = [1, 2, 3, 2, 2, '2']
function unique(arr) {
  const res = []
  
  for(let i = 0; i < arr.length; i++) {
    // var 声明的变量才能提升（不在for内部，从而下面 j === res.length 才能访问）
    for(var j = 0; j < res.length; j++) {
      if (res[j] === arr[i]) break;
    }
    // 跑了一遍完整的res说明这个arr[i]没有重复
    if (j === res.length) {
      res.push(arr[i])
    }
  }
  return res
}
console.log(unique(arr))
```

## indexof + 循环方法

> `indexOf()`方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。(MDN)

```javascript
function unique(arr) {
  const res = []
  for (let i = 0; i < arr.length; i++) {
    if(res.indexOf(arr[i]) === -1) {
      res.push(arr[i])
    }
  }
  return res
}
```

## includes + 循环方法

> `includes()` 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。(MDN)

此方法同`includes`只不过includes是ES6新增的方法，在旧浏览器可能存在兼容性问题

```javascript
function unique(arr) {
  const res = []
  for (let i = 0; i < arr.length; i++) {
    if (!res.includes(arr[i])) {
      res.push(arr[i])
    }
  }
  return res
}
```

## arr.filter + indexOf

> `filter()` 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
>
> var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
>
> (MDN)

```javascript
function unique(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index)
}
```

## arr.sort() + 循环

先将数组排序，再循环比较相邻的元素是否相等

> `sort()` 方法用[原地算法](https://en.wikipedia.org/wiki/In-place_algorithm)对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的
>
> 由于它取决于具体实现，因此无法保证排序的时间和空间复杂性。

```javascript
function unique(arr) {
  const res = []
  arr.sort()
  let front;
  
  for (let i = 0; i < arr.length; i++) {
    // 是第一个元素，或前一个不等这个
    if (!i || front !== arr[i]) {
      res.push(arr[i])
    }
    front = arr[i]
  }
  return res
}
```

## Array.from() + new Set()

```javascript
function unique(arr) {
  return Array.from(new Set(arr))
}
```

简化

```javascript
function unique(arr) {
  return [...new Set(arr)]
}
```

## 对象属性方法

利用对象的键没有重复的特性

```javascript
function unique(arr) {
  const obj = {}
  return arr.filter((item, index, arr) => {
    return obj.hasOwnProperty(item) ? false : (obj[item] = true)
  })
}
```

## 时间测试
(后面有新增测试方式)

### 测试一
从数字0-9中随机生成一个数组，再去重（如果数组长度足够长，这里设为十万，去重后基本只为0-9这十个数字）

注： 

* 由于随机数重复性不确定的因素，每种去重方法执行的去重数组都不一样，存在不定原素，结果只能作为参考。
* 每组方法都会执行多次，取一个介于中间的值。
* 案例arr存在大量重复元素
* 测试环境 node v15.0.1

```javascript
const arr = []

// 十万个
for(let i = 0; i < 100000; i++) {
  arr.push(Math.random() * 10 | 0)
}
// [0，1，1，3，4，5，5...]// 长度为100000
console.log(arr)

// 去重后为无序的1-9的数组，例： [1, 2, 0, 9, 7, 6, 3, 4, 5, 8]
```

1. 原始方法（两个循环）

   ```javaScript 
   console.log(unique(arr))
   console.time()
   unique(arr)
   console.timeEnd()
   ```

   ![](https://gitee.com/maYunLaoXi/image/raw/master/blog/2021/%E6%88%AA%E5%B1%8F2021-04-26%20%E4%B8%8A%E5%8D%889.24.52.png)

2. indexof + 循环方法

   ![](https://gitee.com/maYunLaoXi/image/raw/master/blog/2021/%E6%88%AA%E5%B1%8F2021-04-26%20%E4%B8%8A%E5%8D%889.48.27.png)
   
3. Includes + 循环

   ![](https://gitee.com/maYunLaoXi/image/raw/master/blog/2021/%E6%88%AA%E5%B1%8F2021-04-26%20%E4%B8%8A%E5%8D%889.50.51.png)

4. Filter + indexOf方法

   ![](https://gitee.com/maYunLaoXi/image/raw/master/blog/2021/%E6%88%AA%E5%B1%8F2021-04-26%20%E4%B8%8A%E5%8D%889.51.58.png)

5. Sort + 循环

   ![](https://gitee.com/maYunLaoXi/image/raw/master/blog/2021/%E6%88%AA%E5%B1%8F2021-04-26%20%E4%B8%8A%E5%8D%889.53.41.png)

6.  Array.from + new Set()

   ![](https://gitee.com/maYunLaoXi/image/raw/master/blog/2021/%E6%88%AA%E5%B1%8F2021-04-26%20%E4%B8%8A%E5%8D%889.55.32.png)

7. 对象属性方法

   此方法有点不稳定，有2-5ms之间变化

   ![](https://gitee.com/maYunLaoXi/image/raw/master/blog/2021/%E6%88%AA%E5%B1%8F2021-04-26%20%E4%B8%8A%E5%8D%889.57.17.png)

### 测试二

针对测试一的痛点，对指定了不变因素进行测试。保证测试的数组不变，同时分别测试数组内重复的元素不同的请情下的耗时。

主要代码如下：

```javascript
// 	函数名：分别对应上面 原始方法、indexof + 循环方法、includes + 循环方法、arr.filter + indexOf、arr.sort() + 循环、Array.from() + new Set()、对象属性方法 
const uniques = ['uniqueNormal', 'uniqueIndexOf', 'uniqueIncludes', 'uniqueFilter', 'uniqueSort', 'uniqueSet', 'uniqueObject']
// 随机数组的结果，以备后面去重
const res = {}
// 随机数的可能值，如10即是元素只会在0-9之间的正整数
const situation = [10, 50, 100, 200, 400, 800]

situation.forEach(item => {
  const arr = []
  for(let i = 0; i < 1000000; i++) {
    arr.push(Math.random() * item | 0)
  }
  res[item] = { arr }
})
```

时间记录代码

```javascript 
for(let key in res) {
  uniques.forEach(method => {
    const arr = [...res[key].arr]
    const start = +new Date()
    this[method](arr)
    const end = +new Date()
    res[key][method] = end - start
  })
}
```

所有代码可以下载仓库里的这个文件： [https://gitee.com/mayunlaoxi/interview/blob/master/HTML/array-unique.html](https://gitee.com/mayunlaoxi/interview/blob/master/HTML/array-unique.html)

统计结果如下：

| 去重后长度 | uniqueNormal | uniqueIndexOf | uniqueIncludes | uniqueFilter | uniqueSort | uniqueSet | uniqueObject |
| ---------- | ------------ | ------------- | -------------- | ------------ | ---------- | --------- | ------------ |
| 10         | 25 ms        | 35 ms         | 32 ms          | 42 ms        | 232 ms     | 22 ms     | 21 ms        |
| 50         | 31 ms        | 58 ms         | 57 ms          | 90 ms        | 279 ms     | 25 ms     | 21 ms        |
| 100        | 46 ms        | 85 ms         | 85 ms          | 154 ms       | 299 ms     | 23 ms     | 20 ms        |
| 200        | 77 ms        | 141 ms        | 146 ms         | 271 ms       | 335 ms     | 23 ms     | 20 ms        |
| 400        | 142 ms       | 256 ms        | 257 ms         | 504 ms       | 350 ms     | 23 ms     | 20 ms        |
| 800        | 274 ms       | 487 ms        | 489 ms         | 957 ms       | 405 ms     | 24 ms     | 30 ms        |




## 总结

结果好像并没有其他博主所描述的那样存在秒级的差距。几乎都差不多时间。但是Set方法和对象方法执行时间都比较短且不会随随机数的增多而增加。

另外，有很多方法本身就引用了javaScript内部提供的访求如`filter`、 `indexOf`、 `includes`、 `sort`等其本身内部就有可能会针对不同的场景会应用不同的算法。