var path = require('path')
var createLogger = require(path.normalize(path.join(process.cwd(),"utils","createLogger","index.js")))

var log = createLogger("splider")

module.exports = log;