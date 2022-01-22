const http = require("http");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  autoRewrite: true,
  hostRewrite: true,
  followRedirects: true,
});

export const server = http.createServer(function (req, res) {
  let origin = "https://www.mailcheck.co/";
  if (req.url !== "/") {
    origin = req.url.slice(1);

    origin = origin.slice(0, 6) + "/" + origin.slice(6);
  }

  proxy.on("proxyRes", function (proxyRes, req, res) {
    proxyRes.headers["X-Frame-Options"] = "";
    //proxyRes.headers["x-proxy"] = "basic-http-proxy-o4xnwnyfe-andriipolishko";
  });

  proxy.web(req, res, { target: `${origin}` });
});

const port = 8000;
server.listen(port);
