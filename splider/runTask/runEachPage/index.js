var downloadData = require('./downloadData/')
var getAllLink = require('./getAllLink/')
var axios = require('axios')
var path = require('path')
var {timeout, interval, which} = require(path.normalize(path.join(process.cwd(), 'config', 'fetch.json')))

function * runEachPage (currentPage) {
  var linkSet = yield getAllLink(currentPage)
  if (which === 'both') {
    yield downloadData(linkSet)
  }
}

module.exports = runEachPage
