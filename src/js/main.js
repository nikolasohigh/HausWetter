window.wrapper = document.getElementById('main');

import {showLoginForm, startApp} from './functions.js';


if (localStorage.getItem('loginData') == null) {
  showLoginForm();
} else {
  startApp();
}





