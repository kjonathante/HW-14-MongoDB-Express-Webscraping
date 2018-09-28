var path = require('path')

var express = require('express')
var mongojs = require('mongojs')

var webscrape = require('./src/utils/webscrape')

var dbUrl = 'mongoapp_db'
var collections = ['news']

var db = mongojs(dbUrl, collections)
db.on('error', function(error){
  console.log(error)
})


// Initialize Express
var app = express()

// Set up a static folder (public) for our web app
app.use(express.static(path.join(__dirname, './src/public')))

app.get('/test', async function(req, res) {
  var stories = await webscrape()

  res.json(stories)
})

app.get('/news', function(req, res) {
  db.news.find(
    function(error,value) {
      res.json(value)
    }
  )
})


app.listen(3000, 'localhost', function(){
  console.log('Listening on port localhost:3000')
})