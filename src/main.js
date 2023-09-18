var APIKey = '4d3308ca53179995ca475f65e500b6db'
var city = 'sao luis'
var timezone

const dayOfWeek = {
    'Sun,': 'Dom',
    'Mon,': 'Seg',
    'Tue,': 'Ter',
    'Wed,': 'Quar',
    'Thu,': 'Quin',
    'Fri,': 'Sex',
    'Sat,': 'Sáb'
}

const city_input = document.getElementById('city_input');
city_input.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        city = city_input.value
        getData()
    }
})

function getData () {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=metric&lang=pt_br", {
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
            setData(data)
            timezone = data.timezone
            getTime()
        })
}
getData()

setInterval(getTime, 1000)

function getTime () {
    let unixTime = 	Math.floor(new Date().getTime()/1000.0)
    unixTime += timezone
    let myDate = new Date(unixTime *1000).toUTCString()
    myDate = myDate.split(' ')
    myDate = dayOfWeek[myDate[0]] + ', ' + (myDate[4].slice(0, 5))

    document.getElementById('time').innerText = myDate
}

function setData (data) {
    //nome da cidade
    document.getElementById('city').innerHTML = '<span class="material-symbols-outlined select-none">location_on</span> ' + data.name+', '+data.sys.country

    //imagem
    document.getElementById('img').src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png'

    //temperatura
    document.getElementById('temp').innerText = Math.round(data.main.temp) +'°C'

    //temperatura máxima
    document.getElementById('max').innerText = 'Máxima: '+Math.round(data.main.temp_max)+'°C'

    //temperatura mínima
    document.getElementById('min').innerText = 'Mínima: '+Math.round(data.main.temp_min)+'°C'

    //descrição do clima
    document.getElementById('desc').innerText = data.weather[0].description

    //sensação térmica
    document.getElementById('feels').innerText = 'Sensação Térmica: '+Math.round(data.main.feels_like) + '°C'

    //humidade
    document.getElementById('humidity').innerText = 'Umidade: '+data.main.humidity+'%'

    //velocidade do vento
    document.getElementById('wind').innerText = 'Vento: '+data.wind.speed+' km/h'
}