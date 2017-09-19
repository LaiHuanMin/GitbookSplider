var axios = require('axios')
var querystring = require('querystring')
var $ = require('cheerio')

function * getAllLink (currentPage) {
  var {SpliderUtil, MongoUtil} = global
  var { urlConfig, log } = SpliderUtil
  var { baseUrl, lang, langName } = urlConfig
  try {
    var res = yield axios({
      url: `${baseUrl}?${querystring.stringify({ lang, page: currentPage })}`
    })
    //处理数据
    var {data} = res
    var $html = $(data)
    var titleAnchorList = $html.find(".Books .Book .book-infos")
    var titleAnchorListLen = titleAnchorList.length
    var linkList = []
    for(let anchorIndex = 0;anchorIndex < titleAnchorListLen;anchorIndex++){
        var eachTitleAnchor = titleAnchorList.eq(anchorIndex)
        var href = eachTitleAnchor.attr("href");
        var name = eachTitleAnchor.text()
    }
  } catch(e) {
    SpliderUtil.error(`在获取第${currentPage}页的时候产生了错误，${JSON.stringify(e)}`)
  }
}

module.exports = getAllLink
