const wrapper = document.getElementById('main');
const date = new Date();

let userPosition = {
  isDownloaded: false,
  locationKey: null,
  city: null,
  longitude: null,
  latitude: null
}

let options = {
  isDownloaded: false,
  urlMQTT: 'https://corsproxy.io/?https://dev.rightech.io/api/v1/objects/mqtt-kolya_bondar_yt-3f68k5',
  apiKeyMQTT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2NTg1MzFlOTk2YmE1ZjY2ZTBhNDk0NTAiLCJzdWIiOiI2NTgwY2YzYmE2OWI2MTJmNmE1YjUzNGIiLCJncnAiOiI2NTgwY2YzYmE2OWI2MTJmNmE1YjUzNGEiLCJvcmciOiI2NTgwY2YzYmE2OWI2MTJmNmE1YjUzNGEiLCJsaWMiOiI1ZDNiNWZmMDBhMGE3ZjMwYjY5NWFmZTMiLCJ1c2ciOiJhcGkiLCJmdWxsIjpmYWxzZSwicmlnaHRzIjoxLjUsImlhdCI6MTcwMzIyNzg4MSwiZXhwIjoyMjEwNzEzMjAwfQ.TwTeKWAZtS9LEvo0N8ESuh6AXeoVayiWLG6QmGnXhVM',
  apiKeyWeather: 'GCS3qGbShGtrGN3opAK1SfaIdob7awdI',
}

const espValues = {
  status: false,
  temperature: 0,
  humidity: 0,
  pressure: 0,
  ppm: 0
}

const currentState = {
  ico: null,
  state: null,
  temperature: null
}

let hourlyForecast = [];
let dailyForecast = [];

function toCelcium(temperatureF) {
  return Math.round((temperatureF-32)*(5/9));
}

function saveOptions(key, obj) {
  console.log(`saving: ${key} - ${obj}`);
  localStorage.setItem(`${key}`, JSON.stringify(obj));
}

