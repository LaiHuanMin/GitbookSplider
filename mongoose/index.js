var mongoConfig = require("../config/mongo.json");
var mongoose = require("mongoose");
var log = require("./bunyan/index.js");
var SCHEMA_actionInfo = require('./schema/actionInfo/')
var SCHEMA_locationFile = require('./schema/locationFile/')


var { address, port, dbName } = mongoConfig;
mongoose.connect(`mongodb://${address}:${port}/${dbName}`, {
  useMongoClient: true
});

var connection = mongoose.connection;
connection.on("connected", () => {
    log.info(`已经连接Mongodb数据库，地址:${address}，端口号:${port}，数据库名:${dbName}`)
});
connection.on("error", fail => {
    log.error(`连接Mongodb数据库失败，地址:${address}，端口号:${port}，数据库名:${dbName}`)
});
connection.on("disconnected", () => {
    log.error(`停止连接Mongodb数据库，地址:${address}，端口号:${port}，数据库名:${dbName}`)
});

global.MongoUtil = {
  log,
  mongoose,
  schema: {
      actionInfo: SCHEMA_actionInfo(mongoose),
      locationFile: SCHEMA_locationFile(mongoose)
  }
};

module.exports = global.MongoUtil;