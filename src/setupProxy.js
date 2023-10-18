const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/site/program/financial', {
      target: 'https://www.koreaexim.go.kr',
      changeOrigin: true,
    })
  );
};
