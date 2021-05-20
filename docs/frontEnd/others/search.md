---
title: 速查（一些偶尔用到但又常忘的知识）
date: 2020-11-09
categories:
 - 前端
tags:
 - git
author: 码云老细
---

## git
git config的查看与配置
```
查看配置 global改为local即是本地项目
git config --global -l 

设置用户
git config --global user.name myName
git congit --global user.email myemail@yin.com
```

```
修改已commit的备注
git commit --amend

输入i
编辑后
输入:wq退出
```
### 关联远程分支时，远程分支存在代码而无法提交
see [https://blog.csdn.net/wd2014610/article/details/80854807](https://blog.csdn.net/wd2014610/article/details/80854807)