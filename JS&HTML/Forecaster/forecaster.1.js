function attachEvents() {

    const host = 'https://judgetests.firebaseio.com/';
    const symbols = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614;'
    };

    $('#submit').click(getWeather);

    async function getWeather() {
        //Get name from input field
        let locationName = $('#location').val();

        // Get all location codes (async 1)
        let codes = [];
        try {
            codes = await $.get(host + 'locations.json');
        } catch (err) {
            handleError(err);
        }

        let code = undefined;
        //Find given Location code
        for (let loc of codes) {
            if (loc.name == locationName) {
                code = loc.code;
                break;
            }
        }
        //Request today's forecast (async 2)
        //Request upcoming forcast (async 2)
        let [today, upcoming] = [{}, {}];
        try {
            [today, upcoming] = await Promise.all([
                $.get(`${host}forecast/today/${code}.json`),
                $.get(`${host}forecast/upcoming/${code}.json`)
            ]);
            if (today == null || upcoming == null) throw new Error('Invalid data');
        } catch (err) {
            handleError(err);
        }
        const todayDiv = $('#current');
        const upcomingDiv = $('#upcoming');

        const symbol = symbols[today.forecast.condition];

        const htmlSymbol = `
<span class="condition symbol">${symbol}</span>`;
        const htmlContent = `<span class="condition">
<span class="forecast-data">${today.name}</span>
<span class="forecast-data">${today.forecast.low}&#176 / ${today.forecast.high}&#176</span>
<span class="forecast-data">${today.forecast.condition}</span>
</span>`;

        todayDiv.empty();
        todayDiv.append('<div class="label">Current conditions</div>');
        todayDiv.append(htmlSymbol);
        todayDiv.append(htmlContent);

        upcomingDiv.empty();
        upcomingDiv.append('<div class="label">Three-day forecast</div>');
        for (let day of upcoming.forecast) {
            upcomingDiv.append(renderUpcoming(day));
        }


        $('#forecast').show();

    }

    function renderUpcoming(data) {
        const symbol = symbols[data.condition];

        return `<span class="upcoming">
<span class="symbol">${symbol}</span>
<span class="forecast-data">${data.low}&#176 / ${data.high}&#176</span>
<span class="forecast-data">${data.condition}</span>
</span>`;

    }

    function handleError() {
        $('#forecast').text('Error');
        $('#forecast').show();
    }
}