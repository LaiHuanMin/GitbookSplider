function create(mongoose){
    var Schema = mongoose.Schema({
        status: String, //BEGIN,END,PREVENT
        recordTime: Date,
        desc: String,
        pageIndex: Number
    })
    return Schema;
}

module.exports = create;