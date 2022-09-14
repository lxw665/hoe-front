module.exports = {

  plugins: [
    { src: '~/plugins/nuxt-swiper-plugin.js', ssr: false }
    ],
    css: [
    'swiper/dist/css/swiper.css'
    ],

  /*
  ** Headers of the page
  */
  head: {
    title: '哈尔滨理工大学精品课',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid:'keywords',name:'keywords', content: '哈尔滨理工大学精品课'},
      { hid: 'description', name: 'description', content: '哈尔滨理工大学由原机械工业部所属的哈尔滨科学技术大学、哈尔滨电工学院和哈尔滨工业高等专科学校于1995年合并组建而成，1998年划转黑龙江省属，实行中央与地方共建、以地方为主的管理体制。'  }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },



  
}

