const fields = []; //name, value, info

const matrix = {
    "Температура": ["Поточна температура: ", "&yaxis=°С"],
    "Вологість": ["Поточна вологість: ", "&yaxis=%25"],
    "Атмосферний тиск": ["Поточний атмосферний тиск: ", "&yaxis=%D0%BC%D0%BC.+%D1%80%D1%82.+%D1%81%D1%82"],
    "Концентрація СО₂": ["Поточна концентрація СО₂: ", "&yaxis=PPM"],
}


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


function bf() {
    fields.forEach((element, i) => {
        const chartWrapper = document.createElement('div');
        const header    = document.createElement('h3');
        const chart     = document.createElement('iframe');
        const subHeader = document.createElement('h4');

        for (let key in matrix) {
            if(key == element[0]) {
                subHeader.textContent = matrix[key][0] + element[1];
                chart.src = `https://thingspeak.com/channels/${loginData.channel}/charts/${i+1}?api_key=${loginData.api}&bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=40&type=line&title=${matrix[key][1]}`;
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
}