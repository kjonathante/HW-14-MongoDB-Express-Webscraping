var path = require('path')

var express = require('express')
var mongojs = require('mongojs')

var webscrape = require('./src/utils/webscrape')
var storyModel = require('./src/models/storyModel')

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

app.get('/news', async function(req, res) {
  var stories = await webscrape()
  storyModel.saveAll(db, stories)
  res.json(await storyModel.getAll(db))
})


app.listen(3000, 'localhost', function(){
  console.log('Listening on port localhost:3000')
})