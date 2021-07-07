// 算法
// 排序算法

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if(arr[j] > arr[j + 1]) {
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}
// 优化冒泡排序

function wellBubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let flag = true
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        flag = false
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
    if (flag) break;
  }
}

// 快速
function quickSort(arr) {
  if (arr.length <= 1) return arr

  const midIndex = arr.length / 2 | 0
  const midEle = arr[midIndex]
  const left = []
  const right = []

  arr.forEach(ele => {
    ele < midEle ? left.push(ele) : right.push(ele)
  })
  return [...quickSort(left), midEle, ...quickSort(right)]
}