const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath  = path.join(__dirname, '../templates/partials')

//Setup for handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Cooper'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Cooper'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!',
        name: 'Cooper',
        helpMessage: 'This is the help message'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, {summary, temperature, precipProb} = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                summary,
                temperature,
                precipProb 
            })
          })
    })
    
})

app.get('/products', (req, res) => {
    //Return instead of else statement
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
    
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
