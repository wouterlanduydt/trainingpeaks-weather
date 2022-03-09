const ENDPOINT = "https://vrtnws-api.vrt.be/weather/forecasts/belgische_streken"
const LOCATION = "Centrum"

const fetchWeatherData = async () => {
  return await fetch(ENDPOINT)
    .then(r => r.json())
    .then(data => data.forecasts.filter(forecast => forecast.location === LOCATION && forecast.timeRange === 24))
}

const insertWeatherData = (weatherData) => {
  weatherData.forEach(day => {
    const date = day.beginDate.substring(0, 10)
    const dateContainer = document.querySelectorAll(`[data-date="${date}"]`)[0]
    const dateTitle = dateContainer.getElementsByClassName("dayNumberText")[0]

    const id = `weather-${date}`

    if (!!document.getElementById(id)) return

    const weatherNode = `
      <div id="${id}">
        <span class="icon-weather-type icon-weather-type--${day.weathertype}"></span>
        <span>${day.temperature.minimum} - ${day.temperature.maximum}</span>
        <span class="icon-winddirection icon-winddirection--${day.wind.direction.toLowerCase()}"></span>
        <span>${day.wind.speed1}</span>
      </div>
    `

    dateTitle.insertAdjacentHTML('afterend', weatherNode);
  });
}

(async () => {
  const weatherData = await fetchWeatherData()

  var obs = new MutationObserver(() => {
    insertWeatherData(weatherData)
  });

  obs.observe(document.body, { childList: true });
})();