当我们用`vue`来开发网页的时候，大多数情况下会用到`vuex`来作状态管理。

但是`vuex`在浏览器刷新后数据就随着页在的重载而从新初始化。

很多时候我们并不想在刷新网页的时候将某些数据清除，所以`vuex-persist`应运而生。（[传关门](https://github.com/championswimmer/vuex-persist#readme))

```JavaScript
import VuexPersistence from 'vuex-persist'
```
```JavaScript
const vuexLocal = new VuexPersistence({
  // 使用localStorage
  storage: window.localStorage,
  // 如果不用这个函指定，那么默认所有vuex数数都作持久化处理
  reducer(val) {
      return {
          user: val.user // 这里只对user模块作数据持久化
      }
  }
})
```
然后在vuex中的plugins中引入
```JavaScript
const store = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  modules: {
      user,
      ...
  }
  plugins: [vuexLocal.plugin]
}
```

### 接下来重点来了
> vuex-persist源码是由typeScript转过来的，很多没有作ES5的转化。所以在低版本火狐浏览器及ie中可能打不开（被坑了一波）。

看部分源码： 
```JavaScript
// vuex-persist/dist/cjs/index.js
exports.MockStorage = class {
    get length() {
        return Object.keys(this).length;
    }
    ...
}
...
flushQueue() {
    this._flushing = true;
    const chain = () => {
        const nextTask = this._queue.shift();
        if (nextTask) {
            return nextTask.then(chain);
        }
        else {
            this._flushing = false;
        }
    };
    return Promise.resolve(chain());
}
```
可以看到像`class` `const` `箭头函数`等都没有被转换

#### ES6 转 ES5
在`webpack`中，使用`babel-loader`对 vuex-persist 进行处理

webpack.config.js
```JavaScript
module.exports = {
    entry: { ... },
    output: { ... },
    module: { 
        rule: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    ...
                    resolve('node_modules/vuex-persist/dist')
                ]
            }
        ]
    }
}
```

OK,又解决一个很棘手的问题