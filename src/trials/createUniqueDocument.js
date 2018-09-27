var mongojs = require('mongojs')
var dbUrl = 'mongoapp_db'
var collections = ['news']

var db = mongojs(dbUrl, collections)

db.news.remove()

// this one will be inserted
db.news.update(
  {headline: 'xxx'},  
  {$setOnInsert: 
    {
      headline: 'xxx', 
      summary: 'xxx', 
      url: 'xxx'
    }
  },
  {upsert: true}, 
  function(error, value){
    console.log(error)
    console.log(value)
  }
)

// this one won't be insert
db.news.update(
  {headline: 'xxx'},  
  {$setOnInsert: 
    {
      headline: 'xxx', 
      summary: 'xxx', 
      url: 'yyy'
    }
  },
  {upsert: true}, 
  function(error, value){
    console.log(error)
    console.log(value)
  }
)

// this one will be inserted
db.news.update(
  {headline: 'new'},  
  {$setOnInsert: 
    {
      headline: 'new', 
      summary: 'new', 
      url: 'new'
    }
  },
  {upsert: true}, 
  function(error, value){
    console.log(error)
    console.log(value)
  }
)

db.close()