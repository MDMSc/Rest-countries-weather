const body = document.querySelector('body');

const divMain = document.createElement('div');
divMain.className = 'container';
divMain.setAttribute('id', 'container');

const h1 = document.createElement('h1');
h1.className = 'text-center';
h1.setAttribute('id', 'title');
h1.innerText = "Restcountries and Weather using fetch API";
divMain.appendChild(h1);

const divRow = document.createElement('div');
divRow.setAttribute('class', 'row');

const getData = async function() {
    let result = await fetch("https://restcountries.com/v3.1/all");
    let countries = await result.json();

    countries.forEach((country) => {
        displayData(country);
    });
    divMain.appendChild(divRow);
}

getData();
body.appendChild(divMain);
//<span class="card-title">${data.name.common}</span>
const displayData = function(data) {
    divRow.innerHTML += `
        <div class="col-lg-4 col-sm-12 col-md-4 col-xl-4 g-5">
            <div class="card" id="card">
                <div class="card-header text-center" id="country-name">${data.name.common}</div>
                <img src="${data.flags.png}" class="img-responsive flag" alt="country-flag">
                <div class="card-body">
                
                    <div class="card-text">Captal: ${data.capital}</div>
                    <div class="card-text">Region: ${data.region}</div>
                    <div class="card-text">Country Code: ${data.fifa === undefined? "Unknown" : data.fifa}</div>
                    <button type="button" class="btn btn-primary" title="Get ${data.name.common}'s weather" onclick="getWeather(${data.latlng[0]}, ${data.latlng[1]})">Click for Weather</button>
                </div>
            </div>
        </div>
    
    `;
}

const getWeather = async function(lat, lon) {
    let weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a0ce6f33432a84fff69cbb9297b76fd2`);
    let weatherData = await weatherRes.json();

    divMain.innerHTML=`
    <div class="container">
        <h2>Country: ${weatherData.sys.country}</h2>
        <h5>Weather: ${weatherData.weather[0].main}</h5>
        <h5>Description: ${weatherData.weather[0].description}</h5>
        <h5>Temperature: ${weatherData.main.temp}</h5>
        <h5>Humidity: ${weatherData.main.humidity}</h5>
        <h5>Latitude: ${lat}</h5>
        <h5>Longitude: ${lon}</h5>
    </div>
    `;
} 
