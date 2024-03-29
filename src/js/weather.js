const weatherWrapper          = document.createElement('div'),
      weatherTime             = document.createElement('div'),
      weatherCity             = document.createElement('div'),
      weatherState            = document.createElement('div'),
      weatherTemp             = document.createElement('div'),
      backgroundImage         = document.createElement('img'),
      weatherStatusbar        = document.createElement('div'),
      forecastsWrapper        = document.createElement('div'),
      weatherCarousel         = document.createElement('div'),
      dailyForecastWrapper    = document.createElement('div'),
      dailyForecastImage      = document.createElement('img'),
      dailyForecastHeader     = document.createElement('div'),
      dailyForecastHeaderText = document.createElement('div'),
      dailyForecastList       = document.createElement('ul');

      weatherWrapper.classList.add('weather__wrapper');
      backgroundImage.classList.add('background__img');
      weatherStatusbar.classList.add('weather__statusbar');
      weatherTime.classList.add('weather__time');
      weatherCity.classList.add('weather__city');
      weatherState.classList.add('weather__state');
      weatherTemp.classList.add('weather__temperature');
      forecastsWrapper.classList.add('forecasts');
      weatherCarousel.classList.add('weather__carousel');
      dailyForecastWrapper.classList.add('forecast');
      dailyForecastImage.classList.add('forecast__header-img');
      dailyForecastHeader.classList.add('forecast__header');
      dailyForecastHeaderText.classList.add('forecast__header-text');
      dailyForecastList.classList.add('forecast__list');

      wrapper.appendChild(weatherWrapper);
      weatherWrapper.appendChild(weatherStatusbar);
      weatherStatusbar.appendChild(weatherTime);
      weatherStatusbar.appendChild(weatherCity);
      weatherStatusbar.appendChild(weatherState);
      weatherStatusbar.appendChild(weatherTemp);
      weatherWrapper.appendChild(forecastsWrapper);
      forecastsWrapper.appendChild(weatherCarousel);
      dailyForecastHeader.appendChild(dailyForecastImage);
      dailyForecastHeader.appendChild(dailyForecastHeaderText);
      dailyForecastWrapper.appendChild(dailyForecastHeader);
      dailyForecastWrapper.appendChild(dailyForecastList);
      forecastsWrapper.appendChild(dailyForecastWrapper);

      dailyForecastImage.src = 'src/icons/ui/calendar.svg';
      dailyForecastHeaderText.textContent = 'Прогноз на 5 наступних днiв';
      
//geo-update by click
weatherCity.addEventListener('click', ()=>{
  console.log('reupdate');
  getGeoLocation();
})

startWeatherApp();

function startWeatherApp() {
    timeUpdate();
    if (localStorage.getItem('userPosition') != null || localStorage.getItem('userPosition') != undefined) {
      userPosition = JSON.parse(localStorage.getItem('userPosition'));
      userPosition.isDownloaded = true;
      showCity();
      getCurrentState(showCurrentState);
      getTwelweHoursForecast(initCarousel);
      getFiveDaysForecast(initDailyForecast)
    } else {
      getGeoLocation();
      getCurrentState(showCurrentState);
      getTwelweHoursForecast(initCarousel);
      getFiveDaysForecast(initDailyForecast)
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


async function getTwelweHoursForecast(callback) {
    try {
      const response = await fetch(`https://corsproxy.io/?https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/167753?apikey=${options.apiKeyWeather}&language=uk-ua`); 
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
  
      const data = await response.json();
      data.forEach((element, index) => {
        const hour = {
          time: (date.getHours()+index+1) >= 24 ? (date.getHours()+index-24+1)+ ":00" : (date.getHours()+index+1) + ":00",
          icon: element.WeatherIcon,
          temperature: toCelcium(element.Temperature.Value)
        }
        hourlyForecast.push(hour);
      })

    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
    callback();
}

async function getCity(callback) {
  try {
    const response = await fetch(`https://corsproxy.io/?https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${options.apiKeyWeather}&q=${userPosition.latitude},${userPosition.longitude}`); 
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    userPosition.locationKey = data.Key;
    userPosition.city = data.LocalizedName;
    console.log(userPosition.locationKey);
    console.log(userPosition.city);
    console.log(data);
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
  callback();
  saveOptions('userPosition', userPosition);
}

async function getCurrentState(callback) {
  try {
    const response = await fetch(`https://corsproxy.io/?https://dataservice.accuweather.com/currentconditions/v1/${userPosition.locationKey}?apikey=${options.apiKeyWeather}&language=uk-ua`); 
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
      currentState.ico = data[0].WeatherIcon;
      currentState.state = data[0].WeatherText;
      currentState.temperature = data[0].Temperature.Metric.Value;
    callback();
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

async function getFiveDaysForecast(callback) {
  try {
    const response = await fetch(`https://corsproxy.io/?https://dataservice.accuweather.com/forecasts/v1/daily/5day/${userPosition.locationKey}?apikey=${options.apiKeyWeather}&language=uk-ua`); 
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
      data.DailyForecasts.forEach((element) => {
        const inputDateString = element.Date;
        const inputDate = new Date(inputDateString);
        const day = inputDate.getDate();
        const month = inputDate.getMonth() + 1; 

        const forecast = {
          date: `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}`,
          ico: element.Day.Icon,
          state: element.Day.IconPhrase,
          maximum: toCelcium(element.Temperature.Maximum.Value),
          minimum: toCelcium(element.Temperature.Minimum.Value)
        }

        dailyForecast.push(forecast);
      });
    
    callback();
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

function showCurrentState() {
  weatherState.textContent = currentState.state;
  backgroundImage.src = `src/icons/weather/${currentState.ico}.svg`;
  weatherWrapper.prepend(backgroundImage);

  if (currentState.temperature < 0) {
    weatherTemp.classList.add('big_minus');
    weatherTemp.textContent = Math.round(Math.abs(currentState.temperature));
  } else {
    weatherTemp.textContent = Math.round(currentState.temperature);
  }
}

function initCarousel() {
  hourlyForecast.forEach((element) => {
    weatherCarousel.innerHTML += `
    <div class="weather__carousel-item">
      <div class="weather__carousel-item__time">${element.time}</div>
      <div class="weather__carousel-item__ico"><img src="src/icons/weather/${element.icon}.svg" alt="ico" class="weather__carousel-item__ico-img"></div>
      <div class="weather__carousel-item__temperature ${element.temperature < 0 ? "small_minus" : ""}">${element.temperature}</div>
    </div>`;
  });
  $('.weather__carousel').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1111,
    swipe: false,
    responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 6
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4
      }
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 2
      }
    }
    ]
 });
}

function initDailyForecast() {
  dailyForecast.forEach((element) => {
    dailyForecastList.innerHTML += `
    <li class="forecast__list-item">
      <div class="forecast__date">${element.date}</div>
      <div class="forecast__state">${element.state}</div>
      <div class="forecast__temperatures">
          <div class="forecast__maximum ${element.maximum < 0 ? "small_minus" : ""}">${Math.abs(element.maximum)}</div>
          <div class="forecast__minimum ${element.minimum < 0 ? "small_minus" : ""}">${Math.abs(element.minimum)}</div>
      </div>
    </li>
    `});
}