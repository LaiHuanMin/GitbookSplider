function create (mongoose) {
  const modelName = "spliderDetail"
  var Schema = mongoose.Schema({
    lang: { //语言
      type: String,
      default: 'UNKNOWN'
    },
    url: String, //链接
    bookName: String, //书名
    bookContentDesc: String, //书内容写了什么
    bookUpdateDesc: String, //书什么时候更新
    getLinkTime: Date, //获取Link链接时的时间
    getContentTime: Date, //获取内容时的时间（要完整下载之后才能设置）
    pageIndex: Number, //该资源处于哪一页
    isDownload: { //是否已经下载了
      type: Boolean,
      default: false
    }
  })
  /**
   * 从数据库获取所有爬虫的信息
   */
  Schema.statics.getAllSpliderDetail = function(){ 
    return this.find().exec();
  }
  /**
   * 获取最新的最近的页码，如果数据为空，则pageIndex从0开始
   */
  Schema.statics.getRecentPageIndex = function* (){
    var {SpliderUtil, MongoUtil} = global
    try{
      var result = yield this.find().sort({pageIndex: -1}).exec();
      MongoUtil.log.info("获取上一次的页码成功")      
      if(result.length === 0){
        return 0;
      }else{
        return result.shift().pageIndex;
      }
    }catch(e){
      MongoUtil.log.error("在获取上一次的页码过程中，产生了错误："+JSON.stringify(e))      
    }
  }
  /**
   * 当完成每一页的getAllLink的时候，将该页所有的信息都insertMany到数据库
   */
  Schema.statics.pushEachPageDetail = function* (linkList){
    var {SpliderUtil, MongoUtil} = global
    try{
      var result = yield this.insertMany(linkList);
      MongoUtil.log.info("插入每页的link列表成功：",JSON.stringify(linkList))      
    }catch(e){
      MongoUtil.log.error("在插入每页的link列表过程中，产生了错误："+JSON.stringify(e))      
    }
  }
  return Schema
}

module.exports = create
