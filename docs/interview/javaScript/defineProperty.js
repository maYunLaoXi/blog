
const obj = {
  name: 'obj'
}

let c = Object.defineProperty(obj, 'age', {
  configurable: true,
  enumerable: true,
  get: function(val) {
    console.log('get', val)
  },
  set: function(val) {
    console.log('set', val)
  }
})
console.log({ c })