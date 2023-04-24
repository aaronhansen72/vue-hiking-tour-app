const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //publicPath: '.',
  productionSourceMap: false,
  chainWebpack: config => {
    // change script location from head to body
    config.plugin('html').tap((args) => {
        args[0].scriptLoading = 'blocking'
        // or
        // args[0].inject = 'body'
        return args
    })
  }
})
