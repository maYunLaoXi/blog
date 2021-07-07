// 防抖与节流
// 第一版
function debounce(fn, wait) {
  var timer
  return function() {
    clearTimeout(timer)
    timer = setTimeout(fn, wait)
  }
}
// this问题

function debounce(fn, wait) {
  var timer
  return function() {
    var that = this

    clearTimeout(timer)
    timer = setTimeout(function() {
      fn.apply(that)
    }, wait)
  }
}
// 传参问题
function debounce(fn, wait) {
  var timer
  
  return function() {
    var that = this
    var args = arguments

    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(that, args)
    }, wait);
  }
}

// for(let i = 0; i < 1000; i+=10) {
//   console.log(i)
//   var fn = debounce(function(val){
//     console.log(this)
//     console.log('aaa', i)
//   }, 11)
//   setTimeout(() => {
//     fn()
//   }, i);
// }

// 节流

function throttle(fn, wait) {
  var time
  return function() {
    var that = this
    var args = arguments

    // 先执行第一次
    if (!time) {
      fn.apply(that, args)
      time = +new Date()
    } else {
      var now = +new Date()
      if (now - time >= wait) {
        time = now
        fn.apply(that, args)
      }
    }
  }
}