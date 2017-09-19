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
    bookTimeDesc: String, //书什么时候商家
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
    var result = yield this.find().sort({pageIndex: -1}).exec();
    if(result.length === 0){
      return 0;
    }else{
      return result.shift().pageIndex;
    }
  }
  return Schema
}

module.exports = create
