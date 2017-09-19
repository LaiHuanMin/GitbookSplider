function create (mongoose) {
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
  return Schema
}

module.exports = create
