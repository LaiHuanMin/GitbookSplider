function create (mongoose) {
  const modelName = "spliderDetail"
  var Schema = mongoose.Schema({
    lang: {
      type: String,
      default: 'UNKNOWN'
    },
    itemName: String,
    getLinkTime: Date,
    getContentTime: Date,
    pageIndex: Number,
    url: String,
    isDownload: {
      type: Boolean,
      default: false
    }
  })
  Schema.statics.getAllSpliderDetail = function(){
    return this.find().exec();
  }
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
