var downloadData = require('./downloadData/')
var getAllLink = require('./getAllLink/')
var axios = require('axios')
var path = require('path')
var targetConfig = require(path.normalize(path.join(process.cwd(),"config","fetch.json")))

function * runEachPage(recentPage){
    yield getAllLink()
    yield downloadData()
}

module.exports = runEachPage;