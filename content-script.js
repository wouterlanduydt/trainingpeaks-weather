const ENDPOINT = "https://vrtnws-api.vrt.be/weather/forecasts/belgische_streken"
const LOCATION = "Centrum"

const fetchWeatherData = async () => {
  return await fetch(ENDPOINT)
    .then(r => r.json())
    .then(data => data.forecasts.filter(forecast => forecast.location === LOCATION))
}

(async () => {
  const weatherData = await fetchWeatherData()
  console.log({ weatherData })

  var obs = new MutationObserver(() => {
    const date = "2022-03-10"

    const dateContainer = document.querySelectorAll(`[data-date="${date}"]`)[0];
    const dateTitle = dateContainer.getElementsByClassName("dayNumberText")[0]
    console.log({ dateContainer, dateTitle })

    // TODO: check if element already exists
    dateTitle.insertAdjacentHTML('afterend', '<div>Sample Div</div>');
  });

  obs.observe(document.body, { childList: true });

})();