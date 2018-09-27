var request = require('request')
var cheerio = require('cheerio')

request('https://www.nytimes.com/section/us', function(error, response, html) {
  console.log(error)
  //console.log(response)
  // console.log(html)

  var $ = cheerio.load(html)
  // $('[id^=story-id-] > article > div > a > div.story-meta > h2').map( function(index, element){
  //   console.log(index)
  //   console.log($(element).text().trim()) // headline

  // })

  $('#latest-panel [id^=story-id-]').map( function(index, element){
    console.log(index)
    console.log( $(element).attr('id'))
    console.log( $(element).find('article > div > a > div.story-meta > h2').text().trim())
    console.log( $(element).find('article > div > a > div.story-meta > p').text().trim())
    console.log( $(element).find('article > div > a').attr('href'))
    console.log( $(element).find('article > div > a > div.wide-thumb > img').attr('src'))
  })


})

//  #story-id-100000006129734
// #story-id-100000006129734 > article > div > a > div.story-meta > h2
// #story-id-100000006129734 > article > div > a > div.story-meta > p
//#story-id-100000006129734 > article > div > a
// #story-id-100000006129534 > article > div > a > div.wide-thumb > img