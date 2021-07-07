// 数组去重测试
const arr = []

// 十万个
for(let i = 0; i < 1000000; i++) {
  arr.push(Math.random() * 300 | 0)
}
// console.log(arr)
// 1

// function unique(arr) {
//   const res = []
  
//   for(let i = 0; i < arr.length; i++) {
//     for(var j = 0; j < res.length; j++) {
//       if (res[j] === arr[i]) break;
//     }
//     // 跑了一遍完整的res说明这个arr[i]没有重复
//     if (j === res.length) {
//       res.push(arr[i])
//     }
//   }
//   return res
// }

// 2

// function unique(arr) {
//   const res = []
//   for (let i = 0; i < arr.length; i++) {
//     if(res.indexOf(arr[i]) === -1) {
//       res.push(arr[i])
//     }
//   }
//   return res
// }

// 3

// function unique(arr) {
//   const res = []
//   for (let i = 0; i < arr.length; i++) {
//     if (!res.includes(arr[i])) {
//       res.push(arr[i])
//     }
//   }
//   return res
// }

// 4

// function unique(arr) {
//   return arr.filter((item, index) => arr.indexOf(item) === index)
// }

// 5

// function unique(arr) {
//   const res = []
//   arr.sort()
//   let front;
  
//   for (let i = 0; i < arr.length; i++) {
//     // 是第一个元素，或前一个不等这个
//     if (!i || front !== arr[i]) {
//       res.push(arr[i])
//     }
//     front = arr[i]
//   }
//   return res
// }

// 6

// function unique(arr) {
//   return Array.from(new Set(arr))
// }

// 7

function unique(arr) {
  const obj = {}
  return arr.filter((item, index, arr) => {
    return obj.hasOwnProperty(item) ? false : (obj[item] = true)
  })
}
console.log(unique(arr))
console.time()
unique(arr)
console.timeEnd()