const loginForm         = document.createElement('form'),
      welcomeHeader     = document.createElement('h1'),
      apiLabel          = document.createElement('label'),
      apiInput          = document.createElement('input'),
      channelLabel      = document.createElement('label'),
      channelIdInput    = document.createElement('input'),
      optionsWrapper    = document.createElement('div'),
      rememberCheckbox  = document.createElement('input'),
      help              = document.createElement('p'),
      tip               = document.createElement('div'),
      welcomeButton     = document.createElement('button');
      
      wrapper.classList.add('center');
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

      welcomeHeader.textContent     = 'Вхід';
      apiLabel.textContent          = 'API key';
      channelLabel.textContent      = 'ID каналу';
      apiInput.placeholder          = 'API key';
      channelIdInput.placeholder    = 'ID каналу';
      welcomeButton.textContent     = 'Увійти';
      help.textContent              = 'Потрібна допомога?';

      rememberCheckbox.type = 'checkbox';
      


      if (localStorage.getItem('loginData') == null) {
        login();
      } else {
        startApp();
      }




      apiInput.addEventListener('input', () => {
        checkWelcomeButton();
        if (apiInput.value == '') {
            apiInput.placeholder = 'API key';
            apiLabel.style.top = '22px';
        } else if (apiInput.value != '') {
            apiLabel.style.top = '0px';
            apiInput.placeholder = '';
        }
      });

      channelIdInput.addEventListener('input', () => {
        checkWelcomeButton();
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
        tip.textContent = 'wallah mudila bomba putin allah babahwallah mudila bomba putin allah babahwallah mudila bomba putin allah babah';
      });

      tip.addEventListener('click', () => {
        tip.style.zIndex = '-999';
      });

      welcomeButton.addEventListener('click', (e)=>{
        e.preventDefault();
        wrapper.innerHTML = '';
        wrapper.classList.remove('center');
        loginData.api     = apiInput.value;
        loginData.channel = channelIdInput.value;

        if (rememberCheckbox.checked) {
            loginData.isRemembered = true;
            saveOptions('loginData', loginData);
        }

        startApp();
      });

      function checkWelcomeButton() {
        if (apiInput.value == '' || channelIdInput.value == '') {
            welcomeButton.disabled = true;
            welcomeButton.style.color = '#505050'
            welcomeButton.style.borderColor = '#505050';

        }
        else {
            welcomeButton.disabled = false;
            welcomeButton.style.color = '#fff';
            welcomeButton.style.borderColor = '#fff';
        }
            
      }

      function login() {
        wrapper.appendChild(loginForm);
        wrapper.appendChild(tip);
        loginForm.appendChild(welcomeHeader);
        loginForm.appendChild(apiLabel);
        loginForm.appendChild(apiInput);
        loginForm.appendChild(channelLabel)
        loginForm.appendChild(channelIdInput);
        loginForm.appendChild(optionsWrapper);
        optionsWrapper.appendChild(rememberCheckbox);
        optionsWrapper.appendChild(help);
        loginForm.appendChild(welcomeButton);
        checkWelcomeButton();
      }


