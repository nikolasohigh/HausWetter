export function showLoginForm() {
    wrapper.classList.add('center');
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
}

export function hideExitModal() {
    modalExit.style.bottom = '-140px';
}

export function exit() {
    localStorage.clear();
    location.reload(true);
}

export function showUI() {
    wrapper.appendChild(optionsButton);
    wrapper.appendChild(logoutButton);
    wrapper.appendChild(modalExit);
    //wrapper.appendChild(modalOptions);
}

export function loadOptions(key, obj) {
    console.log(`loading: ${key} - ${obj}`);
    Object.assign(obj, JSON.parse(localStorage.getItem(key)));
  }

export function initSwipeMenu() {
    console.log('initialize slick');
    $('.main').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: false,
        swipe: true
    });
}

export function startApp() {
    loadOptions('loginData', loginData);
    initSwipeMenu();
    sendRequest();
    showUI();
  }

export function saveOptions(key, obj) {
    console.log(`saving: ${key} - ${obj}`);
    localStorage.setItem(`${key}`, JSON.stringify(obj));
  }
  
