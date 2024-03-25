const wrapper = document.getElementById('main');

let loginData = {
  isRemembered: false,
  api: null,
  channel: null
}

let options = {
  adminTelegramBotAPI: '6760658426:AAED14SgTV-MxbCDgX1k_CmEAauSElphxqI',
  adminTelegramChatID: '6632566922'
}

const espValues = {
  temperature: 0,
  humidity: 0,
  pressure: 0,
  ppm: 0
}

function saveOptions(key, obj) {
  console.log(`saving: ${key} - ${obj}`);
  localStorage.setItem(`${key}`, JSON.stringify(obj));
}

function startApp() {
  buildMonitoring();
  buildStatistic();
  initSwipeMenu();
}


function initSwipeMenu() {
  $('.main').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    swipe: true

 });
}