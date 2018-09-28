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

// Set up a static folder
app.use(express.static(path.join(__dirname, './src/public')))
// request.body parser
app.use(express.urlencoded({extended: true}))

// endpoint to start webscraping and returning all the stories
app.get('/news', async function(req, res) {
  var stories = await webscrape()
  storyModel.saveAll(db, stories)
  res.json(await storyModel.getAll(db))
})

// endpoint to READ a story
app.get('/story/:id', async function(req, res) {
 res.json(await storyModel.get(db, req.params.id))
})

// endpoint to CREATE a story's comment
app.post('/comment/:id', async function(req, res) {
  // console.log(req.body.comment, req.params.id)
  res.json(await storyModel.saveComment(db, req.params.id, req.body.comment))
})

// endpoint to DELETE a story's comment
app.delete('/comment/:id', async function(req, res) {
  // console.log(req.body.comment, req.params.id)
  res.json(await storyModel.deleteComment(db, req.params.id, req.body.commentId))
})

app.listen(3000, 'localhost', function(){
  console.log('Listening on port localhost:3000')
})