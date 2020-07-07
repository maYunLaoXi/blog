module.exports = {
  title: 'yingyinbi',
  description: '描绘世界，分享故事',
  plugins: ['@vuepress/active-header-links'],
  theme: 'reco',
  themeConfig: {
    // author
    author: 'yingyinbi',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'awesomeMark', link: '/awesome/' },
      {
        text: 'about',
        items: [
          { text: 'code', link: '/about/'},
          { text: 'photo', link: '/'},
        ]
      },
    ],
    sidebar: 'auto',
    // 备案
    record: 'ICP 备案文案',
    recordLink: 'ICP 备案指向链接',
    cyberSecurityRecord: '公安部备案文案',
    cyberSecurityLink: '公安部备案指向链接',
    // 项目开始时间，只填写年份
    startYear: '2017'
  }
}