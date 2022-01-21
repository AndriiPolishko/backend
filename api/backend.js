/*let http = require("http");
let httpProxy = require("http-proxy");
let proxy = httpProxy.createProxyServer({});
const https = require("https");

function readURL(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        // получаем статус ответа сервера посредством деструктуризации объекта
        const { statusCode } = res;

        let error;
        if (statusCode !== 200) {
          error = new Error(`Ошибка запроса. Код ответа: ${statusCode}`);
        }

        if (error) {
          reject(error);
          res.resume();
          return;
        }

        res.setEncoding("utf8");

        let rawData = "";
        res.on("data", (chunk) => (rawData += chunk));

        res.on("end", () => resolve(rawData));
      })
      .on("error", (e) => reject(e));
  });
}

module.exports = async (req, res) => {
  // res.json({ a: req.body.url });

  let html;

  readURL(req.body.url)
    .then((data) => {
      html = data;
      console.log("Html1 - " + html);
    })
    .catch((err) => console.log(err.message));

  res.send( typeof req.body.url);
    //.json({ a: req.body.url });
};
*/

/*const http = require("http");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  autoRewrite: true,
  hostRewrite: true,
  followRedirects: true,
});

const server = http.createServer((req, res) => {
  let body = "";
  req.on("data", function (chunk) {
    body += chunk;
  });

  req.on("end", function () {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(body);
  });
});

server.listen(8000);*/

// Create a proxy server with custom application logic

/*
const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  autoRewrite: true,
  hostRewrite: true,
  followRedirects: true,
});

const server = http.createServer((req, res) => {
  let body = "";
  req.on("data", function (chunk) {
    body += chunk;
  });

  req.on("end", function () {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(body);
  });

});

server.listen(8000);
*/

const http = require("http");
const httpProxy = require("http-proxy");
let origin = "https://www.google.com/";

const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  autoRewrite: true,
  hostRewrite: true,
  followRedirects: true,
});

export const server = http.createServer(function (req, res) {
  /*if (req.url !== "/")
    origin = req.protocol + "://" + req.get("host") + req.url;*/

  proxy.on("proxyRes", function (proxyRes, req, res) {
    proxyRes.headers["x-proxy"] = "basic-http-proxy-o4xnwnyfe-andriipolishko";
  });
  proxy.web(req, res, { target: `${origin}` });
});

const port = 8000;
server.listen(port);
