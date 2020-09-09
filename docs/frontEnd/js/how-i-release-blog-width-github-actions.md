---
title: 前端程序员如何利用vuePress和gitHub Actions快速自动发布个人博客
date: 2020-08-26
categories:
 - 前端
tags:
 - javaScript
 - gitHub
 - node
author: maYunLaoXi
---

前段时间因为写一个个人的小程序，买了一个腾讯的服务器，还有一个域名，但是小程序只是用了域名来做CDN加速，（因为域名备案要有服务器，！！）



小程序已上架（先推一波： [gitHub代码地址](https://github.com/maYunLaoXi/yingyinbiclound))



服务器不用也是浪费了，所以又开始折腾写一个人人博客网站



对于一个前端而言，写前端页面不是一件难事，只要花点时间就可以了。而如何在服务器上发布只自己的网站却不是所有前端的同学都玩的溜。

本文就选用我觉得比较简便的法教一下大家如何写，以及用`持续集成`发布自己的个个博客网站。

用到的东西：

`vuePress`、服务器和域名、`gitHub仓库`



先看网站效果[www.yingyinbi.com/](http://www.yingyinbi.com/)



惯例先发一张搬砖地点的图片：

[![w8QS4x.md.jpg](https://s1.ax1x.com/2020/09/09/w8QS4x.md.jpg)](https://imgchr.com/i/w8QS4x)

ok,开始

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

上面代码的意思就是开启了一个80端口，访问时静态文件目录为blog(会默认访问blog下的index.html)

简单说一下如何在服务器上运行这个程序

1. 服务器全局安装node
2. 服务器全局安装git
3. 新建一个目录用来存放vuePress-server代码（这里假设目录名为`www`)
4. 上传vuePress-server代码到gitHub仓库，像我们平时clone代码一样，将代码clone到`www`目录下
5. 服务器全局安装pm2(有了node后可以用npm安装)([传送门pm2](https://github.com/Unitech/pm2))

用pm2运行vuePress-server里面的app.js就可以启动80端口的服务了，但是现在我们写的博客网页还没有发布到blog目录下

下面介绍如何将博客网页上传到blog目录下：



## 用gitHub Actions自动上传网页文件到服务器

gitHub Actions是gitHub的持续集成服务。可以看看阮一峰老师的文章：[GitHub Actions 入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

简单来说就是可以在我们提交代码到远程仓库后，gitHub Actions可以自动触发，并执行我们事先设定的动作(action)。

这些动作指的是一系列的运行流程，而且gitHub Actions有一个actions的市场，github用户可以在那里发布自己写的action，也可以使用其他用户发布的action。

当你在gitHub创建了自己博客的仓库并上传了代码，在仓库的界面就可以看到这个Actions的入口：

[![w8mUdx.jpg](https://s1.ax1x.com/2020/09/09/w8mUdx.jpg)](https://imgchr.com/i/w8mUdx)

点第二个红框就可以创建



[![w8mao6.jpg](https://s1.ax1x.com/2020/09/09/w8mao6.jpg)](https://imgchr.com/i/w8mao6)

上图第一个框是设定名称，第二个框就是要写的workflows了。

下面是我的:

```javascript
# 名称
name: CI

# 当master分支有push或pull_request的时候会触发
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # build是一个job的名称，
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # 下面是一个个step
    steps:
    # 切换到master分支
    - uses: actions/checkout@master

    # Runs a single command using the runners shell
    # 这一步是安装node.js
    - name: Setup Node.js environment
      uses: actions/setup-node@v2.1.0
      with:
        node-version: '12.x'

    # 这一步是安装依赖，然后打包
    - name: Run install and build
      run:  yarn && yarn build
    
    # 上传服务器(下面的意思其实是用了社区别人封装的actions)
    # 通过设定自己服务器的用户名和密码，将打包后的文件夹public里所有东西上传到服务器的/www/vuePress/blog下
    - name: Deploy to Server
      uses: hengkx/ssh-deploy@v1.0.1
      with: # 以下为参数
        USERNAME: ${{ secrets.DEPLOY_USER }} # 为了用户信息安全对敏感数据可以在secrets中配置请看下图
        PASSWORD: ${{ secrets.DEPLOY_PASSWORD }}
        HOST: ${{ secrets.DEPLOY_HOST }}
        POTY: 22 // 默认就是22，但是之前没有写，不能成功。
        SOURCE: 'public'
        TARGET: '/www/vuePress/blog'

```

因为服务器的帐号密码等信息不可公开，而本gitHub仓库是公开的，gitHub在setting里有密匙保护的机制

[![w8u7aq.jpg](https://s1.ax1x.com/2020/09/09/w8u7aq.jpg)](https://imgchr.com/i/w8u7aq)

## 最后

只要写完博客，提交一下代码到master分支上就可以了。而且vuePress用的是markdown方法写的，对大部分程序员来说都是会用的。markdown虽不是最好看的文本格式，但是其对文字标题内容有层次的方法，可图片可代码，对程序员来说还是非常友好的。

总结一些缺点：

* gitHub有点慢
* actions从运行到发布也不是很快
* 有时候会发生actons运行失败的问题



目前笔者主要的博客平台是思否。



所有的项目： 

[博客仓库](https://github.com/maYunLaoXi/blog)

[博客的node服务](https://github.com/maYunLaoXi/vuePress-server)

[博客网站效果](http://www.yingyinbi.com/)