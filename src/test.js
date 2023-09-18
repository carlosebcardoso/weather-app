var APIKey = '4d3308ca53179995ca475f65e500b6db'
var city = 'london'
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=metric&lang=pt_br";

var timezone = -10800


var time = 	Math.floor(new Date().getTime()/1000.0)
time += timezone
var myDate = new Date(time *1000)
console.log(typeof(myDate.toUTCString()))

/*
fetch(queryURL, {
    method: 'GET'
})
    .then(response => {
        if (response.ok) {
            console.log('success')
        } else {
            console.log('not successful')
        }
        return response.json()
    })
    .then(data => {
        var time = 	Math.floor(new Date().getTime()/1000.0)
        time += data.timezone
        var myDate = new Date(time *1000)
        console.log(myDate.toUTCString())
        console.log(data)
    })
    */
