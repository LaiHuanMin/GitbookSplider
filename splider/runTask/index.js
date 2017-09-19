var co = require('co')
var runEachPage = require('./runEachPage/')
var path = require('path')
var {timeout,interval,which} = require(path.normalize(path.join(process.cwd(),"config","fetch.json")))
console.log(timeout,interval,which);

function runTask (maxPage) {
  var {SpliderUtil, MongoUtil} = global
  co(function* () {
    var recentPage = yield MongoUtil.model.spliderDetail.getRecentPageIndex();
    SpliderUtil.log.info(`上一次获取的页码是第${recentPage}页，本次任务从该页开始`);
    yield runEachPage(recentPage);
  })
}

module.exports = runTask