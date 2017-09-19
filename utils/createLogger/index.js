var bunyan = require("bunyan");
var path = require("path");
var fs = require("fs");
var moment = require("moment");
function createLogger(dirName) {
  var loggerPath = path.join(
    process.cwd(),
    "logger",
    dirName,
    moment().format("YYYY-MM-DD")
  );

  const LEVEL = {
    "60": "FATAL",
    "50": "ERROR",
    "40": "WARN",
    "30": "INFO",
    "20": "DEBUG",
    "10": "TRACE"
  };

  class ConsoleLogger {
    write(data) {
      data = JSON.parse(data);
      var type = LEVEL[data.level];
      var way = console.log;
      switch (type) {
        case "WARN":
        case "DEBUG":
        case "TRACE":
        case "FATAL":
          way = console.warn;
          break;
        case "ERROR":
          way = console.error;
          break;
      }
      way(`${type}[${data.name}]:  ${data.msg}  [${data.time}] `);
    }
  }

  var log = bunyan.createLogger({
    name: dirName,
    streams: [
      {
        level: "info",
        path: path.normalize(loggerPath + "-info.log")
      },
      {
        level: "info",
        stream: new ConsoleLogger()
      },
      {
        level: "warn",
        stream: new ConsoleLogger()
      },
      {
        level: "warn",
        path: path.normalize(loggerPath + "-warn.log")
      },
      {
        level: "error",
        stream: new ConsoleLogger()
      },
      {
        level: "error",
        path: path.normalize(loggerPath + "-error.log")
      }
    ]
  });
  return log;
}

module.exports = createLogger;
