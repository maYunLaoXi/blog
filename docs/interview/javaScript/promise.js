// Promise的实现

// function Promise(fn) {
//   let state = 'pending'
//   let value = null
//   const callbacks = []

//   this.then = function(onFulfilled) {
//     return new Promise((resolve) => {})
//   }
//   function resolve(res) {
//     if (state !== 'pending') return
//     state = 'fulfilled'
//     value = res
//   }
//   fn(resolve)
// }

// Promise.resolve({ time: 1 }).then(res => {
//   console.log(1, res)
//   // return { time: 2 }
//   throw new Error({time: 'error'});
// })
// .catch(err => {
//   console.log('err1', err)
// })
// .then(res => {
//   console.log(2, res)
// })

function Promise(fn) {
  this.cbs = []

  // resove方法里面是异步，要等Promise里外同步代码执行完
  function resolve(value) {
    this.data = value
    setTimeout(() => {
      this.cbs.forEach(cb => cb(value))
    }, 0)
  }
  fn(resolve.bind(this))
}

Promise.prototype.then = function(onResolved) {
  return new Promise(resolve => {
    this.cbs.push(() => {
      const res = onResolved(this.data)
      
      if (res instanceof Promise) {
        res.then(resolve)
      } else {
        resolve(res)
      }
    })
  })
}
