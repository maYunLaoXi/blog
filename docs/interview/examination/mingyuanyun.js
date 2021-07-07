// 4.
const preload = (urlQueue, maxNum = 1) => {
  return new Promise((resolve,reject) => {
    let successNumber = 0
    let failNumber = 0
    const totalLength = urlQueue.length
    const handler = () => {
      if (urlQueue.length){
        const current = urlQueue.shift()
        fetch(url).then(()=>{
          successNumber++
          handler()
        }).catch(e=>{
          failNumber++
          handler()
        })
      }
      if (successNumber + failNumber >= totalLength){
        resolve({success: successNumber,fail: failNumber})
      }
    }
    for (let i=0; i<maxNum ; i++){
      handler()
    }
 })
 }

 function preload(list, maxNum = 1) {
   return new Promise(resolve => {
     let succeed = 0
     let failed = 0
     let failedUrl = []

     if (!list || !list.length) resolve({ succeed, failed, failedUrl })
     
     const totalLength = list.length
     if (maxNum > totalLength) maxNum = totalLength

     function request() {
       if(list.length) {
         const image = new Image()
         const url = list.shift()
         image.onload = function() {
           succeed++
         }
         image.onerror = function() {
           failed++
           failedUrl.push(url)
         }
         image.scr = url
       }
       if (succeed + failed >= totalLength) {
         resolve({ succeed, failed, failedUrl })
       }
     }
     for (let i = 0; i < maxNum; i++) {
       request()
     }
   })
 }