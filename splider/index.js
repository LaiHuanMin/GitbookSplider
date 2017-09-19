var urlConfig = require("../config/url.json");
var request = require("superagent");
var log = require("./bunyan/");
var fs = require("fs");
var path = require("path");

var baseUrl = urlConfig.base;
var lang = urlConfig.lang;
var pageIndex = 0;

log.info("begin")

// request
//   .get(baseUrl)
//   .query({ lang, page: pageIndex })
//   .end((err, res) => {
//     if (err || !res.ok) {
//       console.log("it's bad request");
//     } else {
//         console.log(process.cwd());
//     }
//   });
