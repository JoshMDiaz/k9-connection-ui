const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/expense-tracker", {
      target: "http://localhost:9001/",
      pathRewrite: { "^/expense-tracker": "" },
      changeOrigin: true,
      secure: false
    })
  );
};
