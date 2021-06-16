module.exports = {
  title: '影音笔',
  description: '描绘世界，分享故事',
  plugins: ['@vuepress/active-header-links'],
  theme: 'reco',
  dest: 'public',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['script', { src: '/filter-css.js' }]
  ],
  themeConfig: {
    type: 'blog',
    // 博客设置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: '分类' // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: '标签' // 默认 “标签”
      }
    },
    valineConfig: {
      appId: 'KfcNw3yNzHAdH6vPwjf0XwA2-9Nh9j0Va',// your appId
      appKey: 'eYyhimGuMFkQFNsfeXER0yMS', // your appKey
    },
    // 最后更新时间
    lastUpdated: 'Last Updated', // string | boolean
    // 作者
    author: 'yingyinbi',
    // 项目开始时间
    startYear: '2020',
    nav: [
      { text: 'Home', link: '/', icon: 'reco-home'},
      { text: '前端', link: '/categories/前端/' },
      { text: '摄影', link: '/categories/摄影/' },
      {
        text: '资料', link: '/awesome/'},
    ],
    sidebar: 'auto',
    // 备案号
    record: '粤ICP备20047855号',
    // recordLink: 'ICP 备案指向链接',
    recordLink: 'https://beian.miit.gov.cn/#/Integrated/recordQuery',
    cyberSecurityRecord: '公安部备案文案',
    cyberSecurityLink: '公安部备案指向链接',
  },
  markdown: {
    lineNumbers: true // 是否在每个代码块的左侧显示行号。
  },
}