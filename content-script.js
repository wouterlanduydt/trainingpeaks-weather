const ENDPOINT = "https://vrtnws-api.vrt.be/weather/forecasts/belgische_streken"
const WEBSITE = "https://www.vrt.be/vrtnws/nl/services/weer/"
const LOCATION = "Centrum"

const fetchWeatherData = async () => {
  return await fetch(ENDPOINT)
    .then(r => r.json())
    .then(data => data.forecasts.filter(forecast => forecast.location === LOCATION))
}

const getDate = (day) => {
  let date = new Date(day.beginDate)

  if (day.timeRange === 24) {
    const newDate = new Date(Number(date))
    newDate.setDate(date.getDate() + 1)
    date = newDate
  }

  return date.toISOString().substring(0, 10)
}

const insertWeatherData = (weatherData) => {
  weatherData.forEach(day => {
    const date = getDate(day)
    const dateContainer = document.querySelectorAll(`[data-date="${date}"]`)[0]
    const dateTitle = dateContainer.getElementsByClassName("dayNumberText")[0]

    const id = `weather-${date}`

    if (!!document.getElementById(id)) return

    const weatherNode = `
      <a id="${id}" class="weather-container" href="${WEBSITE}" target="_blank">
        <span class="icon-weather-type icon-weather-type--${day.weathertype}"></span>
        <div class="weather-container-details">
          <span class="temp">${day.temperature.maximum ? `${day.temperature.maximum}°` : ""} <span class="temp-min">${day.temperature.minimum ? `${day.temperature.minimum}°` : ""}</span></span>
          <div class="wind-container">
            <span class="icon-winddirection icon-winddirection--${day.wind.direction.toLowerCase()}"></span>
            <span>${day.wind.speed1}${day.wind.speed2 ? `-${day.wind.speed2}` : ""}</span>
          </div>
        </div>
      </a>
    `

    dateTitle.insertAdjacentHTML('afterend', weatherNode);
  });
}

(async () => {
  const weatherData = await fetchWeatherData()
  console.log({ weatherData })

  var obs = new MutationObserver(() => {
    insertWeatherData(weatherData)
  });

  obs.observe(document.body, { childList: true });
})();