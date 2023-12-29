const apiKey = 'GCS3qGbShGtrGN3opAK1SfaIdob7awdI'; // Замените на свой API ключ

let lat, lon;
const url = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${options.apiKeyWeather}&q=${lat}%2C%20${lon}`;


function getLocation() {
    if ('geolocation' in navigator) {
    
        navigator.geolocation.getCurrentPosition(
          function(position) {
            
            lat = position.coords.latitude;
            lon = position.coords.longitude;
      
            console.log('Широта:', lat);
            console.log('Долгота:', lon);
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
fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${options.apiKeyWeather}&q=${lat}%2C%20${lon}`)
  .then(response => response.json())
  .then(data => {
    console.log(data.Key);
  })
  .catch(error => {
    console.error('Произошла ошибка:', error);
  })
}
