---
title: Vue Router
date: 2021-04-22 09:55
categories:
 - 前端知识
tags:
 - vue
author: maYunLaoXi
---

## 动态路由匹配

**提问次数： 2**

动态路由用在路由是同一个，但是可以在路径上传参，(动态路径参数 以冒号开头)

```javascript
const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```

此时，跳转路由path为`/user/admin`和`/user/super-admin`是用的同一个组件`User`。

当匹配到一个路由时，参数值会被设置到 `this.$route.params`

| 模式                          | 匹配路径            | $route.params                          |
| ----------------------------- | ------------------- | -------------------------------------- |
| /user/:username               | /user/evan          | `{ username: 'evan' }`                 |
| /user/:username/post/:post_id | /user/evan/post/123 | `{ username: 'evan', post_id: '123' }` |

### 注意

当做用动态路由时，同一个路由的跳转（路由相同，但是参数不同，`/user/foo`跳到`/user/bar`）。原来的组件会被复用，从而不会触发组伯的生命周期函数。可以使用watch进行监听，或使用vueRouter的`beforeRouteUpdate`

参考： [https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html)
