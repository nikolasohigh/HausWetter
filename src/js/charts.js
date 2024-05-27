const fields = []; //name, value, info
let changedDate = false;
const matrix = {
    "Температура": ["Остання зафіксована температура: ", "&yaxis=°С"],
    "Вологість": ["Остання зафіксована вологість: ", "&yaxis=%25"],
    "Атмосферний тиск": ["Останній зафіксований атмосферний тиск: ", "&yaxis=%D0%BC%D0%BC.+%D1%80%D1%82.+%D1%81%D1%82"],
    "Концентрація СО₂": ["Остання зафіксована концентрація СО₂: ", "&yaxis=PPM"],
}


window.statsWrapper = document.createElement('div');
window.statHeader    = document.createElement('h3');
window.statChart     = document.createElement('iframe');
statHeader.textContent = 'Статистичні дані';
statsWrapper.classList.add('chart__wrapper');

window.selectedField = document.createElement('select');



window.startSector = document.createElement('div');
window.since = document.createElement('h3');
window.selectedStartDate = document.createElement('input');
selectedStartDate.type = "datetime-local";
selectedStartDate.value = Date.now();
since.textContent = 'З:';
startSector.appendChild(since);
startSector.appendChild(selectedStartDate);
startSector.classList.add('start');

window.endSector = document.createElement('div');
window.to = document.createElement('h3');
window.selectedEndDate = document.createElement('input');
selectedEndDate.type = "datetime-local";
selectedEndDate.value = Date.now();
to.textContent = 'По:';
endSector.appendChild(to);
endSector.appendChild(selectedEndDate);
endSector.classList.add('end');




function sendRequest() {
    fetch(`https://api.thingspeak.com/channels/${loginData.channel}/feeds.json?api_key=${loginData.api}&results=1&offset=${new Date().getTimezoneOffset()}`)
        .then(response => response.json())
        .then(data => {
            const names  = Object.keys(data.channel).filter(key => key.startsWith('field')).map(key => data.channel[key]);
            const values = Object.keys(data.feeds[0]).filter(key => key.startsWith('field')).map(key => data.feeds[0][key]);

            for (let i = 0; i < names.length; i++) 
                if (names[i] != null && values[i] != null && names[i] != undefined && values[i] != undefined && names[i] !== '' && values[i] !== '')
                    fields.push([names[i], values[i]])

            bf();
    });
}

function buildStatPage() {
    statChart.src = `https://thingspeak.com/channels/2426949/charts/1?api_key=0PLSUGM3M4OTTYRP&bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=40&type=line&title=&offset=${new Date().getTimezoneOffset()}`;
    fields.forEach((element, i) => {
        const fieldOption = document.createElement('option');
        fieldOption.textContent = element[0];
        fieldOption.value = i+1;
        selectedField.appendChild(fieldOption);
    })
    statsWrapper.appendChild(statHeader);
    statsWrapper.appendChild(selectedField);
    statsWrapper.appendChild(statChart);
    statsWrapper.appendChild(startSector);
    statsWrapper.appendChild(endSector);
    $('.main').slick('slickAdd', statsWrapper);

}

function bf() {
    fields.forEach((element, i) => {
        const chartWrapper = document.createElement('div');
        const header    = document.createElement('h3');
        const chart     = document.createElement('iframe');
        const subHeader = document.createElement('h4');

        for (let key in matrix) {
            if(key == element[0]) {
                subHeader.textContent = matrix[key][0] + element[1];
                chart.src = `https://thingspeak.com/channels/${loginData.channel}/charts/${i+1}?api_key=${loginData.api}&bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=30&type=line&title=${matrix[key][1]}`;
                break;
            }
        }
        header.textContent = element[0];

        chartWrapper.classList.add('chart__wrapper');

        chartWrapper.appendChild(header);
        chartWrapper.appendChild(chart);
        chartWrapper.appendChild(subHeader);
        
        $('.main').slick('slickAdd', chartWrapper);
    });
    buildStatPage();
}

selectedField.addEventListener('change', () => {
    if (!changedDate)
    statChart.src = `https://thingspeak.com/channels/2426949/charts/${selectedField.value}?&title=&api_key=0PLSUGM3M4OTTYRP&bgcolor=%23ffffff&color=%23d62020&type=line`;
    if (changedDate)
    statChart.src = `https://thingspeak.com/channels/2426949/charts/${selectedField.value}?&title=&api_key=0PLSUGM3M4OTTYRP&bgcolor=%23ffffff&color=%23d62020&type=line&start=${adjustToUTC(selectedStartDate.value)}&end=${adjustToUTC(selectedEndDate.value)}`;
})

selectedStartDate.addEventListener('input', () => {
    changedDate = true;
    statChart.src = `https://thingspeak.com/channels/2426949/charts/${selectedField.value}?&title=&api_key=0PLSUGM3M4OTTYRP&bgcolor=%23ffffff&color=%23d62020&type=line&start=${adjustToUTC(selectedStartDate.value)}&end=${adjustToUTC(selectedEndDate.value)}`;
})


selectedEndDate.addEventListener('input', () => {
    changedDate = true;
    statChart.src = `https://thingspeak.com/channels/2426949/charts/${selectedField.value}?&title=&api_key=0PLSUGM3M4OTTYRP&bgcolor=%23ffffff&color=%23d62020&type=line&start=${adjustToUTC(selectedStartDate.value)}&end=${adjustToUTC(selectedEndDate.value)}`;
})

function adjustToUTC(timeString) {
    const time = new Date(timeString);
    time.setHours(time.getHours() - 2);
    const year = time.getFullYear();
    const month = String(time.getMonth() + 1).padStart(2, '0');
    const day = String(time.getDate()).padStart(2, '0');
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    const adjustedTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return adjustedTime.replace('T', '%20');
}