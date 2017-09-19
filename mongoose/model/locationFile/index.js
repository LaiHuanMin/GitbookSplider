function create(mongoose) {
  var Schema = mongoose.Schema({
    lang: String,
    itemName: String,
    pageIndex: Number,
    createTime: Date
  });
  return Schema;
}

module.exports = create;
