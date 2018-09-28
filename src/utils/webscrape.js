var request = require('request')
var cheerio = require('cheerio')

// A promise that returns an array of objects
function webscrape() {
  return new Promise(function(resolve,reject) {
    request('https://www.nytimes.com/section/us', function(error, response, html) {
      if (error) {
        console.log(error)
        return reject(error)
      }

      var $ = cheerio.load(html)
      var stories = []       
      $('#latest-panel [id^=story-id-]').each( function(index, element){
        stories.push( {
          storyid: $(element).attr('id'),
          headline: $(element).find('article > div > a > div.story-meta > h2').text().trim(),
          summary: $(element).find('article > div > a > div.story-meta > p.summary').text().trim(),
          url: $(element).find('article > div > a').attr('href'),
          image: $(element).find('article > div > a > div.wide-thumb > img').attr('src')
        } )
      })
      return resolve(stories)
    })
  })
}

module.exports = webscrape