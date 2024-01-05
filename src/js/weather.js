let latitude, longitude;

/*
Если в настройках есть ключ (!= null), то getLocation() и getLocationKey() не выполеняем, так как у нас лимит на запросики
По отдельной кнопочке можно обновлять местоположение, в ущерб запролсикам(((
При билдпейдже и отсутствии ключа дать модалку с варном о юзании метоположения
Сделать модалки на все случаи ошибок
Прочитать документацию и распрасить джексон на 5 дней извлекая нужные данные по дизайну
*/


function getLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
  
        console.log('Широта:', latitude);
        console.log('Долгота:', longitude);
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
    );
    } else {
      console.error('Geolocation не поддерживается в вашем браузере');
    }
}

function getLocationKey() {
fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${options.apiKeyWeather}&q=${latitude}%2C%20${longitude}`)
  .then(response => response.json())
  .then(data => {
    options.locationKey = data.Key;
    console.log(options.locationKey);
  })
  .catch(error => {
    console.error('Произошла ошибка:', error);
  })
}

function getFiveDaysWeather() {
  fetch(`http://dataservice.accuweather.com//forecasts/v1/daily/5day/${options.locationKey}?apikey=${options.apiKeyWeather}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Произошла ошибка:', error);
    })
  } 