let activePage = null;

const options = {
    defaultPage: 1,
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
  const wrapper = document.getElementById('main'),
        monitoringButtons = document.querySelectorAll('.monitoring'),
        statsButtons = document.querySelectorAll('.stats'),
        weatherButtons = document.querySelectorAll('.weather'),
        notifiesButtons = document.querySelectorAll('.notifies'),
        optionsButtons = document.querySelectorAll('.options'),
        guiButtons = document.querySelectorAll('.menu_item');


  monitoringButtons.forEach(button => {
    button.addEventListener('click', function(){
      if(activePage != 1) {
        destroyPage(activePage);
        activePage = 1;
        buildMonitoring(startMonitoring);
      }
    })
  });

  statsButtons.forEach(button => {
    button.addEventListener('click', function(){
      if(activePage != 2) {
      destroyPage(activePage);
      activePage = 2;
      //buildStats();
      }
    })
  });

  weatherButtons.forEach(button => {
    button.addEventListener('click', function(){
      if(activePage != 3) { 
        destroyPage(activePage);
        activePage = 3;
        //buildWeather();
      }
    })
  });

  notifiesButtons.forEach(button => {
    button.addEventListener('click', function(){
      if(activePage != 4) {
      destroyPage(activePage);
      activePage = 4;
      //buildNotifies();
      }
    })
  });

  optionsButtons.forEach(button => {
    button.addEventListener('click', function(){
      if(activePage !== 5) {
      destroyPage(activePage);
      activePage = 5;
      //buildOptions();
      }
    })
  });



  //обработка полосочки над кнопками
  guiButtons.forEach(button => {
    button.addEventListener('click', function(){
        guiButtons.forEach(btn => {
            btn.classList.remove('gui_button_active');
        })
    this.classList.add('gui_button_active');
    })
  });

  function destroyPage(page) {
    switch (page) {
      case 1: 
        destroyMonitoring();
        break;
      case 2: 
        console.log('destroyStats()');
        break;
      case 3: 
        console.log('destroyWeather()');
        break;
      case 4: 
        console.log('destroyNotifies');
        break;
      case 5: 
        console.log('destroyOptions');
        break;
    }
  }