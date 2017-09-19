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
    var anchorList = $html.find(".Books .Book .book-infos")
    var anchorListLen = anchorList.length
    var linkList = []
    for(let anchorIndex = 0;anchorIndex < anchorListLen;anchorIndex++){
        var eachItem = anchorList.eq(anchorIndex)
        var titleAnchor = eachItem.find(".title a");
        var href = titleAnchor.attr("href");
        var name = titleAnchor.text()
        var descAnchor = eachItem.find(".description")
        var bookDesc = descAnchor.text();
        var updateAnchor = eachItem.find(".updated");
        var updateDesc = updateAnchor.text();
        linkList.push({
            lang,
            url: href, //链接
            bookName: name, //书名
            bookContentDesc: bookDesc, //书内容写了什么
            bookUpdateDesc: updateDesc, //书什么时候更新
            getLinkTime: new Date(), //获取Link链接时的时间
            pageIndex: currentPage, //该资源处于哪一页
        })
    }
    yield MongoUtil.model.spliderDetail.pushEachPageDetail(linkList)
  } catch(e) {
    SpliderUtil.log.error(`在获取第${currentPage}页的时候产生了错误，${JSON.stringify(e)}`)
  }
}

module.exports = getAllLink
