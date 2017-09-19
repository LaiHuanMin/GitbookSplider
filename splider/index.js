var urlConfig = require("../config/url.json");
var log = require("./bunyan/");
var runTask = require("./runTask/");
var initTask = require("./initTask/");

var { baseUrl, lang, langName } = urlConfig;

global.AppUtil = {
  urlConfig,
  log
};

initTask();

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
