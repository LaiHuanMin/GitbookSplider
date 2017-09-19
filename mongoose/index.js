var mongoConfig = require('../config/mongo.json')
var mongoose = require('mongoose')
var log = require('./bunyan/index.js')
var SCHEMA_actionInfo = require('./schema/actionInfo/')
var SCHEMA_locationFile = require('./schema/locationFile/')

function initTask () {
  return new Promise((resolve, reject) => {
    var { address, port, dbName } = mongoConfig
    mongoose.connect(`mongodb://${address}:${port}/${dbName}`, {
      useMongoClient: true
    })

    var connection = mongoose.connection
    connection.on('connected', () => {
      log.info(`已经连接Mongodb数据库，地址:${address}，端口号:${port}，数据库名:${dbName}`)

      // 初始化Schema和Model，并且设置global的值
      var actionInfoSchema = SCHEMA_actionInfo(mongoose)
      var locationFileSchema = SCHEMA_locationFile(mongoose)
      var actionInfoModel = mongoose.model(
        'actionInfo',
        actionInfoSchema,
        'actionInfo'
      )
      var locationFileModel = mongoose.model(
        'locationFile',
        locationFileSchema,
        'locationFile'
      )

      global.MongoUtil = {
        log,
        mongoose,
        schema: {
          actionInfo: actionInfoSchema,
          locationFile: locationFileSchema
        },
        model: {
          actionInfo: null,
          locationFile: null
        }
      }

      resolve(global.MongoUtil);
    })
    connection.on('error', fail => {
      log.error(`连接Mongodb数据库失败，地址:${address}，端口号:${port}，数据库名:${dbName}`)
      reject(fail);
    })
    connection.on('disconnected', () => {
      log.error(`停止连接Mongodb数据库，地址:${address}，端口号:${port}，数据库名:${dbName}`)
    })
  })
}

module.exports = initTask
