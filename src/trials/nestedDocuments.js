var mongojs = require('mongojs')
var dbUrl = 'mongoapp_db'
var collections = ['news']

var db = mongojs(dbUrl, collections)
var lastStoryId
var lastCommentId

main()

async function main() {
  await remove()
  await update1()
  await update2()
  await update3()
  await find()
  await pull()
  await close()
}

function remove() {
  return new Promise(function(resolve,reject) {
    db.news.remove(
      function(error, value){
        if (error) {
          console.log(error)
          return reject(error)
        }
    
        console.log('[Inside REMOVE]', value)
        return resolve()
      }
    )     
  })
}

function update1() {
  return new Promise(function(resolve,reject) {
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
        if (error) {
          console.log(error)
          return reject(error)
        }

        console.log('[Inside UPDATE #1]', value)
        return resolve()
      }
    )
  })
}

function update2() {
  return new Promise(function(resolve,reject) {
    db.news.update(
      {headline: 'xxx'},  
      { $push: 
        { comments: 
          {
            _id: mongojs.ObjectId(),
            user: 'anonymous',
            comment: 'blah blah blah'
          }
        }
      },
      function(error, value){
        if (error) {
          console.log(error)
          return reject(error)
        }

        console.log('[Inside UPDATE #2]', value)
        return resolve()
      }
    )
  })
}

function update3() {
  return new Promise(function(resolve,reject) {
    db.news.update(
      {headline: 'xxx'},  
      { $push: 
        { comments: 
          {
            _id: mongojs.ObjectId(),
            user: 'anonymous',
            comment: 'blah blah blahx'
          }
        }
      },
      function(error, value){
        if (error) {
          console.log(error)
          return reject(error)
        }

        console.log('[Inside UPDATE #3]', value)
        return resolve()
      }
    )
  })
}

function find() {
  return new Promise(function(resolve,reject) {
    db.news.find(function(error,value){
      if (error) {
        console.log(error)
        return reject(error)
      }

      console.log('[Inside FIND]')
      value.forEach( function(story) {
        console.log(story._id)
        // console.log(story.comments)
        // for(var i=0, len=story.comments.length;i<len;i++){
        //   console.log(story.comments[i]._id)
        // }
        story.comments.forEach( function(comment){
          console.log(comment._id)
          lastCommentId = comment._id
        })
        lastStoryId=story._id
      })

      return resolve()
    })
  })
}

function pull() {
  return new Promise(function(resolve,reject) {
    db.news.update(
      {_id: mongojs.ObjectId(lastStoryId)},  
      { $pull: 
        { comments: 
          {
            _id: mongojs.ObjectId(lastCommentId)
          }
        }
      },
      function(error, value){
        if (error) {
          console.log(error)
          return reject(error)
        }

        console.log('[Inside Pull]', value)
        return resolve()
      }
    )
  })
}

function close() {
  return new Promise(function(resolve, reject) {
    db.close(function(error,value){
      if (error) {
        console.log(error)
        return reject(error)
      }

      console.log('[Inside Close]', value)
      return resolve()
    })
  })
}