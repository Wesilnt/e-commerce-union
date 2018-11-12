const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { NODE_ENV } = process.env
const isProd = NODE_ENV === 'production'
module.exports = {
  lintOnSave: undefined,
  css: { extract: true },
  configureWebpack: {
    plugins: isProd
      ? [
          new uglifyJsPlugin({
            uglifyOptions: {
              compress: {
                join_vars: true,
                warnings: false,
                drop_console: isProd,
                drop_debugger: isProd
              },
              toplevel: false,
              ie8: false
            }
          })
        ]
      : []
  }
}
