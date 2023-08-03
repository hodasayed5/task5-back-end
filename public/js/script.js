
let form =document.getElementById("form4")
const errorf = document.getElementById("error")
const locationf = document.getElementById("location")
const forecastf = document.getElementById("forecast")
const longtitudef = document.getElementById("longtitude")
const latitudef = document.getElementById("latitude")
form.addEventListener('submit' , (e)=>{
e.preventDefault()
weatherFunction()
form.reset()


})

let weatherFunction = async () =>{
    try{
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:3000/weather?address='+address)
        const data = await res.json()
        console.log(data)
        if(data.error){
            errorf.innerText = data.error
            locationf.innerText = ""
            latitudef.innerText = ""
            longtitudef.innerText = ""
            forecastf.innerText = ""
            
        }
        else{
           
            locationf.innerText = data.location
            latitudef.innerText = data.latitude
            longtitudef.innerText = data.longtitude
            forecastf.innerText = data.forecast
            
            errorf.innerText = ""
        }
    }
    catch(e){
        console.log(e)
    }
}