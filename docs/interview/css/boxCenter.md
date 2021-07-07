---
title: 盒子居中
date: 2021-04-14
categories:
 - 前端知识
tags:
 - css
author: maYunLaoXi
---

1. position

   父元素设position: relative;

   子元素设置position: absolute;

   子无素距上50%,距左50%，再分别设定margin-left,margin-top为负的width / 2, height / 2

   ```html
   <style>
     .wrap{
       position: relative;
     }
     .box{
       width: 100px;
       height: 50px;
       position: absolute;
       left: 50%;
       top: 50%;
       margin-left: -50px;
       margin-top: -25px;
     }
   </style>
   <div calss="wrap">
     <div class="box">
       content
     </div>
   </div>
   ```

2. ### position transform方法

   与position方法类似，但是不用知道宽高，用transform： translate(-50%, -50%)计算其左，上移对应的一半。

   ```html
   <style>
     .wrap{
       position: relative;
     }
     .box{
       position: absolute;
       left: 50%;
       top: 50%;
       transform: translate(-50%, -50%)
     }
   </style>
   ```

3. position并合left, top, right, bottom为0让margin: auto

   要知道宽高

   ```html
   <style>
     .wrap{
       position: relative;
     }
     .box{
       position: absolute;
       width: 200px;
       height: 100;
       left: 0;
       top: 0;
       bottom: 0;
       right: 0;
       margin: auto;
     }
   </style>
   ```
   
4. flex

   flex有两种方法

   最简单的一种

   ```html
   <style>
     .wrap{
       display: flex;
     }
     .box{
       margin: auto;
     }
   </style>
   <div class="wrap">
     <div class="box">
       content
     </div>
   </div>
   ```

   第二种

   ```css
   .wrap{
     display: flex;
   }
   .box{
     align-items: center;
     justify-content: center;
   }
   ```

   