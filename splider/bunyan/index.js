var bunyan = require("bunyan");
var path = require("path");
var fs = require("fs");
var moment = require("moment");

var loggerPath = path.join(process.cwd(), "logger", "splider", moment().format("YYYY-MM-DD"));

var log = bunyan.createLogger({
  name: "splider",
  streams: [
    {
      level: "info",
      stream: process.stdout
    },
    {
      level: "info",
      path: path.normalize(loggerPath+"-info.log")
    },
    {
      level: "warn",
      stream: process.stdout
    },
    {
      level: "warn",
      path: path.normalize(loggerPath+"-warn.log")
    },
    {
      level: "error",
      stream: process.stderr
    },
    {
      level: "error",
      path: path.normalize(loggerPath+"-error.log")
    }
  ]
});

module.exports = log;
