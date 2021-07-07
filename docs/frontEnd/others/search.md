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

### 远程连接服务器
重启后要输入密码：  ssh-add -K 密钥

### mac安装nvm的坑
访问gitHub主页： [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

终端输入:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

按装成功后找不到nvm，文档还说要添加以下文件到 ~/.bash_profile文件里，但是我的电脑没有这个，要手动添加一个

```
# 新建一个
touch ~/.bash_profile
```
添加官网的代码

```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

最后如果不生效，在终端执行

```
source ~/.bash_profile
```
以上如果在安装时连接gitHub的源报443的话，还要改一下host
查ip的网站： [https://www.ipaddress.com/](https://www.ipaddress.com/)

改host可以用这个软件: [https://github.com/oldj/SwitchHosts/releases](https://github.com/oldj/SwitchHosts/releases)
