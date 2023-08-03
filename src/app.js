const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

const path = require("path")
const x = path.join(__dirname, "../public")
app.use(express.static(x))

app.set('view engine', 'hbs');
const viewsDirectory = path.join(__dirname, "../temp1/views")
app.set("views", viewsDirectory)


var hbs = require('hbs')
const partialspath = path.join(__dirname,"../temp1/partials")
hbs.registerPartials(partialspath)

app.get('/', (req, res) => {
    res.render('index', {
        title: "Home Page",
        desc: " Welcome in home page",
        imag1:"image/FV6S1CRWQAEPero-1-800x500.jpg"
    })
})



const geocode = require('./data/geocode')
const forecast = require('./data/forecaste')

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
        }
        forecast(data.latitude,data.longtitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location:req.query.address,
                latitude: data.latitude,
                longtitude:data.longtitude,
            })
        })
    })
})




app.get('*' , (req , res)=> {
    res.send('404 Page Not Founded')
 })






// app.get('/weather', (req, res) => {
//     res.render('weather', {
//         // title1: "Check Weather Page",
//         // country: "Egypt",
//         // latitude: " 26.4941838299718",
//         // longtiude : "29.871903452398",
//         // crrentWeather :"Sunny",
//         // temp:"30.7",
 
//     })
// })


app.listen(port, () => {
    console.log(`done ${port}`)
})