function create(mongoose) {
  var Schema = mongoose.Schema({
    lang: String,
    lastActionItemName: String,
    lastActionTime: Date,
    lastActionPageIndex: Number
  });
  return Schema;
}

module.exports = create;