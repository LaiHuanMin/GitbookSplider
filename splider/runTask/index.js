var co = require('co')
var runEachPage = require('./runEachPage/')
var path = require('path')
var {timeout,interval,which} = require(path.normalize(path.join(process.cwd(),"config","fetch.json")))

function runTask (maxPage) {
  var {SpliderUtil, MongoUtil} = global
  co(function* () { 
    //获取上一次的页码
    var recentPage = yield MongoUtil.model.spliderDetail.getRecentPageIndex();
    SpliderUtil.log.info(`上一次获取的页码是第${recentPage}页，本次任务从该页开始`);
    //开启任务
    for(let currentPage = recentPage;currentPage < maxPage;currentPage++){
        SpliderUtil.log.info(`正在获取第${currentPage}页的数据，请稍候`);
        yield runEachPage(currentPage);
        SpliderUtil.log.info(`第${currentPage}页的数据获取完毕，进入${interval}毫秒的延时阶段`);
        //延时interval秒
        yield new Promise(resolve=>{
            setTimeout(function(){
                resolve();
            },interval+(parseInt(Math.random() * 10000)))
        })
    }
  })
}

module.exports = runTask