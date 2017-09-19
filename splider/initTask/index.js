var $ = require("cheerio");
var querystring = require("querystring");
var axios = require("axios");

function initTask() {
  return new Promise((resolve, reject) => {
    var { urlConfig, log } = global.SpliderUtil;
    var { baseUrl, lang, langName } = urlConfig;
    axios({
      url: `${baseUrl}?${querystring.stringify({ lang, page: 0 })}`
    })
      .then(res => {
        var { data } = res;
        var $html = $(data);
        var maxPage = parseInt($html
                        .find(".separator")
                        .parent()
                        .next()
                        .find("a")[0].firstChild.data)
        if (maxPage === undefined) {
          throw new Error("无法找到所指定的最大页面值，可能页面结构已经变更！");
        }
        resolve({maxPage,$html});
      })
      .catch(fail => {
        reject(fail);
      });
  });
}
module.exports = initTask;
