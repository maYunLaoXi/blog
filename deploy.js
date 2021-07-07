const open = require('open')
const { execSync, exec } = require('child_process')

// 如果没有cloudbaserc.json中将地域设为广州，下面命令还要加上 -r gz
const res = exec('tcb hosting deploy ./public/ . -e  blog-5g6imv5tbabd1547', (err) => {
  if (err) {
    console.error(err)
    return
  }
  open('http://www.yingyinbi.com')
})
res.stdout.on('data', console.log)
res.on('data', console.log)
