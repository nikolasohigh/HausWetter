

window.modalOptions = document.createElement('div');
window.optionsButton = document.createElement('img');
window.logoutButton = document.createElement('img');
window.modalExit = document.createElement('div');


modalOptions.classList.add('modal-options');


optionsButton.src = 'src/icons/ui/settings.svg';
logoutButton.src = 'src/icons/ui/logout.svg';

optionsButton.classList.add('options-button');
logoutButton.classList.add('logout-button');
modalExit.classList.add('modal-exit');

modalExit.innerHTML = `
<h5>Ви дійсно бажаєте вийти?</h5>
<div>
    <button onclick="
        localStorage.clear();
        location.reload(true);
    ">Так</button>
    <button onclick="
        modalExit.style.bottom = '-140px';
    ">Hi</button>
</div>`;
    
logoutButton.addEventListener('click', () => {
    modalExit.style.bottom = '0px';
});

