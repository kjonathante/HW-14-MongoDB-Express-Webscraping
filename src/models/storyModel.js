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

        console.log('[Inside UPDATE #1]', value)
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

module.exports = { saveAll, getAll }