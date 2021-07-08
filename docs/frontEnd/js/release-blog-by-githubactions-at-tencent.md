---
title: 如何利用GitHub Actions将个人博客发布到腾讯云静态网站托管
date: 2021-07-08
categories:
 - 前端
tags:
 - javaScript
 - gitHub
 - node
author: maYunLaoXi
---

之前有写过一篇使用github actions将个人博客发布在自有服务器上的博客：[前端程序员如何利用vuePress和gitHub Actions快速自动发布个人博客](http://www.yingyinbi.com/frontEnd/js/how-i-release-blog-width-github-actions.html#vuepress)

最近服务器也已经到期被回收了，终合之下决定将个人博客网站发布在腾讯云的静态网站托管服务上。目前的流量还没有达到腾讯的收费点，所以一直还是在免费使用。

## 改造项目

博客项目还是以前那个，仓库也还在gitHub上，改一下github actions，让其自动发布到腾讯云。

### 发布的流程：

之前的流程是将代码提交到gitHub，然后github在远程自动拉取依赖，运行打包命令，最后将打包的文件上传到服务器指定的目录。

现在更改后的流程和以前大至相同，将代码提交到gitHub后，远程自动拉取依赖后打包，最后将打包后的文件上传到腾讯网页托管目录下。

由于腾讯网页工具升级和腾讯云选择的地域的选择不一样，这其中会遇到很多坑，与网上有不少差别。这里写下避坑指南。

### 操作

首先，这里默认您已经有腾讯云的帐号并开通腾讯静态网页托管服务。如果还没有，可以看一下腾讯官方指南，里面有详细的教程（链接在文未）。

![](https://gitee.com/maYunLaoXi/image/raw/master/blog/2021/%E6%88%AA%E5%B1%8F2021-07-08%20%E4%B8%8B%E5%8D%883.50.14.png)

其次，本地用腾讯自己的CLI： [CloudBase CLI](https://docs.cloudbase.net/cli-v1/install.html) 工具在本地发布一下自己的网页。（这里可以跳过，但是推荐自己走一下这个流程，这样可以避免很多问题）

流程如下：

##### 进入项目目录进行初始化

```bash
cloudbase
```
会出现相关提示，最后记信要选择保存在配置文件里。

第一个选择y，第二个是选腾讯云网站托管的id，第三个是填入name属性，相当于你的应用名，可以随便写。

![](https://gitee.com/maYunLaoXi/image/raw/master/blog/2021/WeChat59cf98df325592969aeef3595af25162.png)

最后将结果保存在配置文件中：

是否需要修改默认配置要看自己的情况，我这一次的用来演示的，所以选择了否。

![](https://gitee.com/maYunLaoXi/image/raw/master/blog/2021/WeChat66b394b6d0a6fcc9844df0216716be5d.png)

选完后`cloudbaserc.json`文件会出现大该如下的风容：

![](https://gitee.com/maYunLaoXi/image/raw/master/blog/2021/%E6%88%AA%E5%B1%8F2021-07-08%20%E4%B8%8B%E5%8D%884.10.04.png)

我这里已经识别运行`tcb`命令的时候已经识别出了是用`vuePress`做的项目，添加了`framework-plugin-website`这个插件。但是打包后的地址我改成了public。

这其中的注意点： 

1. `region`如果选的不是上海，都应该填上自己托管的地方。我这里的广州：` ap-guangzhou`
2. framework.name字段必须填上，不然跑Actions的时候会卡在“请选择唯一标识”，所以上面才建议本地跑一遍，这样确保配置文件里已经设定了所有的提示项。
3. 其中`envId`默认会明文填上你的id,这里改为`{{envId}}`

### ci文件的设置

ci文件主要是应用了`TencentCloudBase/cloudbase-action`这个插件，v2版本。这个插件已经包括了安装node、依赖、打包和发布的过程，所以整个ci文件变得更加简单。

其中`secretId`,`secretKey`,`envId`的设定都和上一篇文章一至，在gitHub里设定，不懂的可以再看看： [前端程序员如何利用vuePress和gitHub Actions快速自动发布个人博客](http://www.yingyinbi.com/frontEnd/js/how-i-release-blog-width-github-actions.html#vuepress)

```yml
name: CI
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: checkout branch master
      uses: actions/checkout@master

    # 使用云开发 Github Action 部署
    - name: Deploy static to Tencent CloudBase
      id: deployStatic
      uses: TencentCloudBase/cloudbase-action@v2
      with:
        # 云开发的访问密钥 secretId 和 secretKey
        secretId: ${{ secrets.SECRET_ID }}
        secretKey: ${{ secrets.SECRET_KEY }}
        # 云开发的环境id
        envId: ${{ secrets.ENV_ID }}
        # Github 项目静态文件的路径
        staticSrcPath: public

```



最后只要将代码提交到master分支上，这可以自动发布了。



#### 参考

[腾讯静态网页托管使用指南： https://cloud.tencent.com/document/product/1210/52127](https://cloud.tencent.com/document/product/1210/52127)

