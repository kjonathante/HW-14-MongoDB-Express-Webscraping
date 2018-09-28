var mongojs = require('mongojs')

function saveStory( db, story ) {
  return new Promise(function(resolve,reject) {
    db.news.update(
      {headline: story.headline},  
      {$setOnInsert: 
        {
          storyid: story.storyid,
          headline: story.headline, 
          summary: story.summary, 
          url: story.url,
          image: story.image
        }
      },
      {upsert: true}, 
      function(error, value){
        if (error) {
          console.log(error)
          return reject(error)
        }

        return resolve()
      }
    )
  })
}

function saveAll( db, stories ) {
  stories.forEach( async function(story) {
    try {
      await saveStory( db, story )
    } catch (error) {
      console.log(error)
    }
  })
}

function getAll( db ) {
  return new Promise(function(resolve,reject) {
    db.news.find(function(error,value){
      if (error) {
        console.log(error)
        return reject(error)
      }
      return resolve(value)
    })
  })
}

function get( db, id ) {
  return new Promise(function(resolve,reject) {
    db.news.findOne(
      {_id: mongojs.ObjectId(id)},
      function(error,value){
        if (error) {
          console.log(error)
          return reject(error)
        }
        return resolve(value)
      })
    }
  )
}

function saveComment( db, id, comment ) {
  return new Promise(function(resolve,reject) {
    db.news.update(
      {_id: mongojs.ObjectID(id)},  
      { $push: 
        { comments: 
          {
            _id: mongojs.ObjectId(),
            user: 'anonymous', // TODO
            comment: comment
          }
        }
      },
      function(error, value){
        if (error) {
          console.log(error)
          return reject(error)
        }

        return resolve(value)
      }
    )
  })  
}

function deleteComment(db, storyId, commentId) {
  return new Promise(function(resolve,reject) {
    db.news.update(
      {_id: mongojs.ObjectId(storyId)},  
      { $pull: 
        { comments: 
          {
            _id: mongojs.ObjectId(commentId)
          }
        }
      },
      function(error, value){
        if (error) {
          console.log(error)
          return reject(error)
        }

        return resolve(value)
      }
    )
  })
}

module.exports = { saveAll, getAll, get, saveComment, deleteComment }