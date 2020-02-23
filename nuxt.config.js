
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/sass/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "~/plugins/vant.js",
    { src: '~/plugins/axios.js', ssr: true },
    { src: '~/plugins/api.js', ssr: true },
    { src: '~/plugins/filter.js' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
  ],

  axios: {
    proxy: true
  },
  proxy: {
    '/b2b': {
      target: 'https://m.testb2b.17ecgo.com',
      pathRewrite: { '^/b2b/': '' }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  router: {
    // middleware: 'auth'
  },
  loading: {
    color: '#ff503f',
    height: '2px'
  },
  transition: 'moveL'

}
