//API
var APIKey = '4d3308ca53179995ca475f65e500b6db'
var city = 'sao luis'
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=metric&lang=pt";

const dayOfWeek = {
    0: 'Domingo',
    1: 'Segunda',
    2: 'Terça',
    3: 'Quarta',
    4: 'Quinta',
    5: 'Sexta',
    6: 'Sábado'
}

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
        console.log(data)
        setData(data)
    })
showTime()
setInterval(showTime, 10000)

function organizeTime (time) {
    time = time.toString()
    if (time.length == 1) {
        time = '0' + time
    }
    return time
}

function showTime() {
    let date = new Date()
    let day = dayOfWeek[date.getDay()]
    let hours = organizeTime(date.getHours())
    let minutes = organizeTime(date.getMinutes())

    document.getElementById('time').innerText = day+', '+hours+':'+minutes
}


function setData (data) {
    //nome da cidade
    document.getElementById('city').innerHTML += data.name+', '+data.sys.country

    //dia e horário
    

    //imagem
    document.getElementById('img').src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png'

    //temperatura
    document.getElementById('temp').innerText = data.main.temp+'°C'

    //descrição do clima
    document.getElementById('desc').innerText = data.weather[0].description

    //sensação térmica
    document.getElementById('feels').innerText = 'Sensação Térmica: '+data.main.feels_like + '°C'

    //humidade
    document.getElementById('humidity').innerText = 'Humidade: '+data.main.humidity+'%'

    //velocidade do vento
    document.getElementById('wind').innerText = 'Vento: '+data.wind.speed+' km/h'

    //temperatura máxima
    document.getElementById('max').innerText = 'Temperatura Máxima: '+data.main.temp_max+'°C'

    //temperatura mínima
    document.getElementById('min').innerText = 'Temperatura Mínima: '+data.main.temp_min+'°C'
}
