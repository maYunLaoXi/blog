module.exports = {
  title: '影音笔',
  description: '描绘世界，分享故事',
  plugins: ['@vuepress/active-header-links'],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { 
        text: 'about',
        items: [
          { text: 'code', link: '/about/'},
          { text: 'photo', link: '/'},
        ]
      },
    ],
    sidebar: 'auto'
  }
}