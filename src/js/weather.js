//weather wrapper init
const weatherWrapper = document.createElement('div');
      weatherWrapper.classList.add('weather__wrapper');

//weather wrapper build
wrapper.appendChild(weatherWrapper);

//build background images
const backgroundImage = document.createElement('img');
      backgroundImage.classList.add('background__img');
//init and build statusbar
const weatherStatusbar = document.createElement('div');
      weatherStatusbar.classList.add('weather__statusbar');
      weatherWrapper.appendChild(weatherStatusbar);

//init and build statusbar data
const weatherTime  = document.createElement('div'),
      weatherCity  = document.createElement('div'),
      weatherState = document.createElement('div'),
      weatherTemp  = document.createElement('div');
      //classes
      weatherTime.classList.add('weather__time');
      weatherCity.classList.add('weather__city');
      weatherState.classList.add('weather__state');
      weatherTemp.classList.add('weather__temperature');
      //build
    weatherStatusbar.appendChild(weatherTime);
    weatherStatusbar.appendChild(weatherCity);
    weatherStatusbar.appendChild(weatherState);
    weatherStatusbar.appendChild(weatherTemp);

//geo-update by click
weatherCity.addEventListener('click', ()=>{
  console.log('reupdate');
  getGeoLocation();
})


function initMainSlider() {
  $('.main').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
 }); 
}
const currentState = {
  ico: null,
  state: null,
  temperature: null
}

const date = new Date();

// $(document).ready(function(){
//     $('.weather__carousel').slick({
//        infinite: true,
//        slidesToShow: 5,
//        slidesToScroll: 1,
//        arrows: false,
//        autoplay: true,
//        autoplaySpeed: 1111,
//        swipe: false,
//        responsive: [
//         {
//           breakpoint: 1024,
//           settings: {
//             slidesToShow: 4
//           }
//         },
//         {
//           breakpoint: 500,
//           settings: {
//             slidesToShow: 2
//           }
//         }
//        ]
//     })

//     $('.main').slick({
//        infinite: false,
//        slidesToShow: 1,
//        slidesToScroll: 1,
//        arrows: false,
//     });   
// });

//startApp();

startApp();

function startApp() {
    timeUpdate();
    if (localStorage.getItem('userPosition') != null || localStorage.getItem('userPosition') != undefined) {
        userPosition = JSON.parse(localStorage.getItem('userPosition'));
        userPosition.isDownloaded = true;
        showCity();
        getCurrentState(showCurrentState);
    } else {
        getGeoLocation();
        getCurrentState(showCurrentState);
    }
}

function timeUpdate() {
    setInterval(function() {
      weatherTime.textContent = (date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()) + ":" + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());
      }, 1000);
}

function getGeoLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          userPosition.latitude = position.coords.latitude;
          userPosition.longitude = position.coords.longitude;
          getCity(showCity);
        },
        function(error) {
          switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error('Пользователь отказал в доступе к местоположению');
            break;
          case error.POSITION_UNAVAILABLE:
            console.error('Информация о местоположении недоступна');
            break;
          case error.TIMEOUT:
            console.error('Время ожидания запроса истекло');
            break;
          case error.UNKNOWN_ERROR:
            console.error('Произошла неизвестная ошибка');
            break;
          }
        }
      )
      } else {
        console.error('Geolocation не поддерживается в вашем браузере');
      }
}
  
function showCity() {
  console.log("building city");
  weatherCity.textContent = userPosition.city;
}

function toCelcium(temperatureF) {
  return Math.round((temperatureF-32)*(5/9));
}

async function getTwelweHoursForecast() {
    try {
      const response = await fetch(`https://corsproxy.io/?https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/167753?apikey=${options.apiKeyWeather}&language=uk-ua`); 
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
  
      const data = await response.json();
  
      console.log(data);

    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
}

async function getCity(callback) {
  try {
    const response = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${options.apiKeyWeather}&q=${userPosition.latitude},${userPosition.longitude}`); 
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    userPosition.locationKey = data.Key;
    userPosition.city = data.LocalizedName;
    console.log(userPosition.locationKey);
    console.log(userPosition.city);
    console.log(data);
    callback();
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
  saveOptions('userPosition', userPosition);
}

async function getCurrentState(callback) {
  try {
    const response = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${userPosition.locationKey}?apikey=${options.apiKeyWeather}&language=uk-ua`); 
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
      console.log(data);
      currentState.ico = data[0].WeatherIcon;
      currentState.state = data[0].WeatherText;
      currentState.temperature = data[0].Temperature.Metric.Value;
    
    callback();
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

function showCurrentState() {
  weatherState.textContent = currentState.state;
  backgroundImage.src = `src/icons/weather/${currentState.ico}.svg`;
  for(let i = 0; i < 3; i++) {
    const copy = backgroundImage.cloneNode(true);
    weatherWrapper.prepend(copy);
  }

  if (currentState.temperature < 0) {
    weatherTemp.classList.add('big_minus');
    weatherTemp.textContent = Math.abs(currentState.temperature);
  } else {
    weatherTemp.textContent = currentState.temperature;
  }
}