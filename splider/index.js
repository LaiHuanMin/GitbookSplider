var urlConfig = require("../config/url.json");
var log = require("./bunyan/");
var runTask = require("./runTask/");
var initTask = require("./initTask/");


global.AppUtil = {
  urlConfig,
  log
};

initTask().then(maxPage=>{
    log.info("initTask初始化完毕，本次任务最终的页码为"+maxPage);
}).catch(fail=>{
    log.error("initTask处错误产生：",JSON.stringify(fail));
});