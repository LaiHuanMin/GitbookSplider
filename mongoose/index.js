var mongoConfig = require('../config/mongo.json')
var mongoose = require('mongoose')
var log = require('./bunyan/index.js')
var createSpliderDetailSchema = require('./schema/spliderDetail/')
var createspliderStatusSchema = require('./schema/spliderStatus/')

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
      var spliderDetailSchema = createSpliderDetailSchema(mongoose)
      var spliderStatusSchema = createspliderStatusSchema(mongoose)
      var spliderDetailModel = mongoose.model(
        'spliderDetail',
        spliderDetailSchema,
        'spliderDetail'
      )
      var spliderStatusModel = mongoose.model(
        'spliderStatus',
        spliderStatusSchema,
        'spliderStatus'
      )

      global.MongoUtil = {
        log,
        mongoose,
        schema: {
          spliderDetail: spliderDetailSchema,
          spliderStatus: spliderStatusSchema
        },
        model: {
          spliderDetail: spliderDetailModel,
          spliderStatus: spliderStatusModel
        }
      }

      resolve(global.MongoUtil)
    })
    connection.on('error', fail => {
      log.error(`连接Mongodb数据库失败，地址:${address}，端口号:${port}，数据库名:${dbName}`)
      reject(fail)
    })
    connection.on('disconnected', () => {
      log.error(`停止连接Mongodb数据库，地址:${address}，端口号:${port}，数据库名:${dbName}`)
    })
  })
}

module.exports = initTask
