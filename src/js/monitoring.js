const listOfCards     = document.createElement('div'),
      statusCard      = document.createElement('li'),
      temperatureCard = document.createElement('li'),
      humidityCard    = document.createElement('li'),
      pressureCard    = document.createElement('li'),
      ppmCard         = document.createElement('li'),
      updateButton    = document.createElement('button'),
      cardsOfValues   = [statusCard, temperatureCard, humidityCard, pressureCard, ppmCard];

listOfCards.classList.add('list_values');

function getState() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', options.urlMQTT);
  xhr.setRequestHeader('Authorization', options.apiKeyMQTT);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      switch (xhr.status) {
        case 200:
          getValues(xhr.responseText, showValues);
          console.log('Succes');
          break;
        case 404:
          console.log('Incorrect url');
          break;
        case 401:
          console.log('Incorrect authorization');
          break;
        case 403:
          console.log('CORS Error. Check proxy');
          break;
        default:
          console.log('Unknown error');
          console.error('Error:', xhr.status);
          break;
      }
    }
  };
  xhr.send();
}

function getValues(responseString, callback) {
  const stateObj = JSON.parse(responseString).state;
  espValues.status = stateObj.online;
  espValues.temperature = stateObj.TEMPERATURE;
  espValues.humidity = stateObj.HUMIDITY;
  espValues.pressure = stateObj.PRESSURE;
  espValues.ppm = stateObj.PPM;
  espValues.online = stateObj.online;
  callback();
  console.log(espValues);
}

function showValues() {
    if (espValues.status == true) statusCard.innerHTML        = '<div>Статус</div>           <div class="value-margin">Онлайн</div>';
    else statusCard.innerHTML                                 = '<div>Статус</div>           <div class="value-margin">Офлайн</div>';
    temperatureCard.innerHTML                                 = `<div>Температура</div>      <div class="value-margin">${espValues.temperature}</div>`;
    humidityCard.innerHTML                                    = `<div>Вологість</div>        <div class="value-margin">${espValues.humidity}</div>`;
    pressureCard.innerHTML                                    = `<div>Атмосферний тиск</div> <div class="value-margin">${espValues.pressure}</div>`;
    ppmCard.innerHTML                                         = `<div>РРМ</div>              <div class="value-margin">${espValues.ppm}</div>`;
}

function startMonitoring() {
  console.log('Выполняем команду');
  getState();
  setTimeout(function() {
    if (activePage === 1) {
      startMonitoring(); 
    }
  }, 5000);
}

function buildMonitoring(callback) {
  wrapper.appendChild(listOfCards);
  cardsOfValues.forEach((element) =>{
  listOfCards.appendChild(element);
})
callback();
}

function destroyMonitoring() {
  wrapper.removeChild(listOfCards);
}
