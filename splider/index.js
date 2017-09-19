var urlConfig = require('../config/url.json')
var log = require('./bunyan/')
var runSpliderTask = require('./runTask/')
var initSpliderTask = require('./initTask/')
var initDbTask = require('../mongoose/index.js')


global.SpliderUtil = {
  urlConfig,
  log
}

//先初始化数据库，确保成功才继续下去
initDbTask().then(() => {
  initSpliderTask().then(({maxPage,$html}) => {
    log.info('initSpliderTask初始化完毕，本次任务最终的页码为' + maxPage)
    runSpliderTask(maxPage)
  }).catch(fail => {
    log.error('initSpliderTask处错误产生：', JSON.stringify(fail))
  })
}).catch(() => {
  log.error('因为数据库产生错误，所以爬虫任务不再进行')
})
