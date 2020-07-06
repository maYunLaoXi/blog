### 背景

最近做的项目有一个奇葩问题，项目做完后交给甲方，由于甲方数据库比我们模拟的库在数据量上大好多（单表有几个亿的量）。直接导致接口请求的时间都在30s以上。。。

当然数据的优化只能交给后端的同事去做了。但是目前最主要的任务是提供一个能看的前端页面给甲方验收。

请求慢的问题暴露了前端的很多缺陷。在补充了加载提示等功能后，用户大量的重复点击产生的重复接口请求导致相同的数据在请求结束后蜂拥而来。

网上找了一些博主的方法（见文未链接），全部都是拦截了前面的请求。比如说发了一个请求`a`, 在 a 还没有完成时，又发了一个与 a 一样的请求 `a2` ,博主们的方法是取消了请求`a`只保留`a2`

以上方法在接口快的时候是不会有问题的。但是接口慢的时候，`a`接口都快要请求完成了，这时给它来了个取消。就有点不合理。

所以我现在的做法是取消后来的`a2`,保留`a`。

### 开始

爬一爬`axios`官方文档[传关门](http://www.axios-js.com/zh-cn/docs/#%E5%8F%96%E6%B6%88),要取消一个正在发出或已发出但是还没有返回数据的请求，用到的是`axios.CancelToken`这个对像里面的方法，如下： 

1. 第一种方法：使用 CancelToken.source 工厂方法创建 cancel token，像这样：

```JavaScript
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
     // 处理错误
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');

```

2. 第二种方法： 通过传递一个 executor 函数到 CancelToken 的构造函数来创建 cancel token：
```JavaScript
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// cancel the request
cancel();
```

#### 两种方法的区别与应用
第一种方法是多个请求共用一个token,适合在某一时间同时取消所有请求，第二种方法每个请求有独立的token,适合每个请求分情况是否进行单独取消。

显然本次需求要用第二种方法。

#### 实现

核心方法就是在请求时将请求信息存在一个数组里，然后在请求结速之后在这个数组中移除。下次再发请求时就在数组里找是否存在相同的请求，如果存在，那么取消本次请求。

参看`axios`文档，在`请求拦截`与`响应拦截`都会反回请求的原始数据。

```JavaScript
// 添加请求拦截器
// config中有 url, data, params等信息
axios.interceptors.request.use(function (config) {
    return config;
});

// 添加响应拦截器
// 其中response.config与请求拦截的config是一样的
axios.interceptors.response.use(function (response) {
    return response;
});
```

#### 封装方法

```JavaScript
const CancelToken = axios.CancelToken
let requestQueue = []

// 请求拦截调用
function handleRequest({ config }) {
  // 提取四个参数用于区分相同的请求
  const { url, method, data = {}, params = {} } =  config;
  const jData = JSON.stringify(data),jParams = JSON.stringify(params)
  
  const panding = requestQueue.filter(item => {
    return item.url === url && item.method === method && item.data === jData && item.params === jParams
  })
  if(panding.length){
    // 这里是重点，实例化CancelToken时，对参数 c 进行立即调用，即可立即取消当前请求
    config.cancelToken = new CancelToken(c => c(`重复的请求被主动拦截: ${url} + ${jData} + ${jParams}`))
  }else{
    // 如果请求不存在，将数据转为JSON字符串格式，后面比较好对比
    requestQueue.push({
      url,
      data: jData,
      params: jParams,
      method,
    })
  }
}

// 响应拦截调用
function handleResponse({ config }) {
  const { url, data = JSON.stringify({}), params = JSON.stringify({}) } = config
  let reqQueue = requestQueue.filter(item => {
    return item.url !== url && item.data !== data && item.params !== params
  })
  requestQueue = reqQueue
}
```
#### 在请求封装调用
```JavaScript
// 请求拦截
axios.interceptors.request.use(function (config) {
    handleRequest({ config })
    return config;
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
    handleResponse({ config: response.config })
    return response;
});
```

试运行结果
![NbiZz8.png](https://s1.ax1x.com/2020/07/02/NbiZz8.png)
#### 总结一下
1. 以上方法用了 axios 的`CancelToken`方法，其实文档没有详细说明清楚什么时候可以调用这个方法，导致很多开发者以为只能在panding状太下才可以使用，经过我的测试，在请求拦截中就可以调用cancel。
2. 上述方法存在的问题： 用了JSON.stringify处理对像，JSON的方法用在对像上是会出现键值排列错乱的情况，可以调用sort()方法来先排序。由于我在项目中的接口细分比较多，请求参数都不是很多，无视了这个缺陷。
3. 在请求拦截中不return config，不就不会发请求了吗？经测式，如果在请求拦截中不return 或i return config，会在axios抛出一个报错。
4. 个别接口虽然已被拦截，但是没有在控制台中打印`Cancel{message: 'url'}`这个信息。找不到原因。


本次更改在写博文时没有经过生产检验，欢迎大家帮我找找bug


参考： 

[axios 的二次封装（拦截重复请求、异常统一处理）](https://segmentfault.com/a/1190000016457844)

[axios中取消请求及阻止重复请求的方法](https://blog.csdn.net/harsima/article/details/93717217)