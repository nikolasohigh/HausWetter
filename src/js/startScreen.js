import { startApp, saveOptions} from "./functions.js";

window.loginForm         = document.createElement('form');
window.welcomeHeader     = document.createElement('h1');
window.apiLabel          = document.createElement('label');
window.apiInput          = document.createElement('input');
window.channelLabel      = document.createElement('label');
window.channelIdInput    = document.createElement('input');
window.optionsWrapper    = document.createElement('div');
window.rememberCheckbox  = document.createElement('input');
window.help              = document.createElement('p');
window.tip               = document.createElement('div');
window.welcomeButton     = document.createElement('button');

welcomeHeader.classList.add('login__header');
loginForm.classList.add('login-form');
apiLabel.classList.add('login-label', 'api-label');
apiInput.classList.add('login-input', 'api__input');
channelLabel.classList.add('login-label', 'channel-label');
channelIdInput.classList.add('login-input', 'channel__input');
welcomeButton.classList.add('login-button');
optionsWrapper.classList.add('login-wrapper');
rememberCheckbox.classList.add('login-checkbox');
help.classList.add('login-link');
tip.classList.add('login-tip');

rememberCheckbox.type         = 'checkbox';
welcomeHeader.textContent     = 'Вхід';
apiLabel.textContent          = 'API key';
channelLabel.textContent      = 'ID каналу';
apiInput.placeholder          = 'API key';
channelIdInput.placeholder    = 'ID каналу';
welcomeButton.textContent     = 'Увійти';
welcomeButton.disabled        = true;
help.textContent              = 'Потрібна допомога?';
channelIdInput.type                 = 'number';

      
      
apiInput.addEventListener('input', () => {
  if (apiInput.value == '' || channelIdInput.value == '' || channelIdInput.value.length < 5 || apiInput.value.length < 8) {
    welcomeButton.disabled = true;
    welcomeButton.style.color = '#393E46'
    welcomeButton.style.borderColor = '#393E46';

  }
  else {
      welcomeButton.disabled = false;
      welcomeButton.style.color = '#EEEEEE';
      welcomeButton.style.borderColor = '#EEEEEE';
  }
  if (apiInput.value == '') {
      apiInput.placeholder = 'API key';
      apiLabel.style.top = '22px';
  } else if (apiInput.value != '') {
      apiLabel.style.top = '0px';
      apiInput.placeholder = '';
  }
});

channelIdInput.addEventListener('input', () => {
  if (apiInput.value == '' || channelIdInput.value == '' || channelIdInput.value.length < 5 || apiInput.value.length < 8) {
    welcomeButton.disabled = true;
    welcomeButton.style.color = '#393E46'
    welcomeButton.style.borderColor = '#393E46';

  }
  else {
      welcomeButton.disabled = false;
      welcomeButton.style.color = '#EEEEEE';
      welcomeButton.style.borderColor = '#EEEEEE';
  }

  if (channelIdInput.value == '') {
      channelIdInput.placeholder = 'ID каналу';
      channelLabel.style.top = '22px';
  } else if (channelIdInput.value != '') {
      channelLabel.style.top = '0px';
      channelIdInput.placeholder = '';
  }
});

help.addEventListener('click', () => {
  tip.style.zIndex = '999';
  tip.innerHTML = `<br> <br> У поле 'API Key' необхідно вести API READ ключ з сайту thingspeak.com <br> 
  <br> У поле 'ID каналу' необхідно вести ідентифікатор каналу, з якого необхідно дивитись інформацію
  <br> <br> Перейти на <a href="https://thingspeak.com/">ThingSpeak.com</a>
  `;
});

tip.addEventListener('click', () => {
  tip.style.zIndex = '-999';
});

welcomeButton.addEventListener('click', (e)=>{
  e.preventDefault();
  fetch(`https://api.thingspeak.com/channels/${channelIdInput.value}/feeds.json?api_key=${apiInput.value}&results=1&offset=${new Date().getTimezoneOffset()}`)
  .then(response => {
      if (response.status === 404 || response.status === 400) {
        console.log('asddsa');
      }
      else {
        wrapper.innerHTML = '';
        wrapper.classList.remove('center');
        loginData.api     = apiInput.value;
        loginData.channel = channelIdInput.value;
        if (rememberCheckbox.checked) saveOptions('loginData', loginData);
        startApp();
      }    
    })
});

const warn404 = document.createElement('h6');
warn404.textContent = 'Помилка 404. Перевірте номер каналу'