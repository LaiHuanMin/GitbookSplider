var path = require('path')
var createLogger = require(path.normalize(path.join(process.cwd(),"utils","createLogger","index.js")))

var log = createLogger("mongodb")

module.exports = log;