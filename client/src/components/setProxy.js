const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  //# 서버 URL or localhost:설정한포트번호
  app.use(
    "/",
    createProxyMiddleware({
      target: "http://localhost:80",
      changeOrigin: true,
    })
  );
};
