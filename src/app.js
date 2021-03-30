const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// express is just a function
const app = express()
const name = 'Pablo'

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engines and views location
app.set('view engine', 'hbs') // use the handlebars module
app.set('views', viewsPath) // we change the dir of views to the one of viewsPath
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

// get the index.hsb, important to delete the previous index.html file
// for some reason we had to put the views folder inside of src for it to work, before changing the directory to templates
app.get('', (req, res) => {
    // we use render when it's a hsb, and we can provide an object with the values that we want that view to access
    res.render('index', {
        title: 'Weather App',
        name
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Need any help?',
        name
    })
})

//when a request to get the path, send a response
app.get('/weather', (req, res) => {
    // we can send a response in html or json, when sending objects express will automatically stringify it
    // it's important to add the return keyword, otherwise the .send function will be executed twice and that will throw an error
    const address = req.query.address

    if(!address){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }
            
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({ error })
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address
                })
            })
        })
})

// if the path requested is any different than the ones previously defined, can also be even more precise by giving a path like /help/* 
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        message: 'Can\'t find what you\'re looking for',
        name
    })
})

//listening on port 3000
app.listen(3000, () => {
    console.log('Server running on port 3000')
})
