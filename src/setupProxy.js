const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/k9-connect', {
      target: 'http://localhost:9001/',
      pathRewrite: { '^/k9-connect': '' },
      changeOrigin: true,
      secure: false,
    })
  )
}
