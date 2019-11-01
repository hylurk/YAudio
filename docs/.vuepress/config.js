module.exports = {
  plugins: {
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: {
        '/': {
          message: '发现新内容可用',
          buttonText: '刷新',
        }
      }
    },
    '@vuepress/back-to-top': true
  },
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'YAudio',
      description: '一款原生 H5 的音频播放器',
    },
  },
  // head: [['link', { rel: 'icon', href: `/logo.png` }]],
  themeConfig: {
    // repo: 'MoePlayer/DPlayer',
    // editLinks: true,
    docsDir: 'docs',
    locales: {
      '/': {
        lang: 'zh-CN',
        // selectText: '选择语言',
        label: '简体中文',
        // editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: [
          {
            text: '指南',
            link: '/guide/'
          },
          {
            text: '配置',
            link: '/config/'
          },
          {
            text: '联系作者',
            link: '/yinmu/'
          }
        ]
      }
    }
  }
}