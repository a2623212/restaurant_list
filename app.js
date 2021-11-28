const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

//  setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//  set static files
app.use(express.static('public'))

//  route setting - index
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// route setting - search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    const resName = restaurant.name
    const resEnName = restaurant.name_en
    const resCat = restaurant.category
    if (resName.includes(keyword) || resEnName.toLowerCase().includes(keyword.toLowerCase())) {
      return restaurant
    } else if (resCat.includes(keyword)) {
      return restaurant
    }
  })

  res.render('index', {
    restaurants: restaurants,
    keyword: keyword
  })
})


// route setting - show
app.get('/restaurants/:restaurant_id', (req, res) => {

  const restaurant = restaurantList.results.find(restaurant => {
    return restaurant.id.toString() === req.params.restaurant_id
  })
  res.render('show', { restaurant: restaurant })
})

//  start and listen on the express server
app.listen(port, () => {
  console.log(`Now is running on Express on localhost${port}`)
})