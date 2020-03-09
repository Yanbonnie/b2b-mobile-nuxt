//生产环境提取css
let cssRule = process.env.NODE_ENV == 'production' ? {extractCSS: {allChunks: true}} : {}

module.exports = {
  mode: 'universal',
  // mode:'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: '行走网',//process.env.npm_package_name || '行走网',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', type: 'text/css', href: '//at.alicdn.com/t/font_1667324_cfgxgp55sqp.css'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [
    process.env.NODE_ENV == 'production' ? '~/assets/sass/main.css' : '~/assets/sass/main.scss'
    // {
    //   src: '~/assets/sass/main.scss',
    //   lang: 'scss'
    // }
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "~/plugins/vant.js",
    {src: '~/plugins/axios.js', ssr: true},
    {src: '~/plugins/api.js', ssr: true},
    {src: '~/plugins/filter.js'}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    ['cookie-universal-nuxt', {alias: 'cookiz'}],
  ],

  axios: {
    proxy: true
  },
  proxy: {
    '/b2b': {
      target: 'https://m.testb2b.17ecgo.com',
      pathRewrite: {'^/b2b/': ''}
    }
  },
  /*
  ** Build configuration
  */
  build: {
    //提取css
    ...cssRule,
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  router: {
    // middleware: ['spa']
  },
  loading: {
    color: '#ff503f',
    height: '2px'
  },
  // transition: 'moveL',
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0' // default: localhost
  }

}
