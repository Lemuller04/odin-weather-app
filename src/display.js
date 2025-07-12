import { format } from "date-fns";
import Events from "./events.js";

const Display = (() => {
  function updateThemeByTime() {
    const hour = new Date().getHours();
    const root = document.documentElement;

    if (hour >= 6 && hour <= 17) {
      root.style.setProperty("--bg-color", "#4f8ad1");
    } else {
      root.style.setProperty("--bg-color", "#141426");
    }
  }

  function updateTopBar(data, today) {
    updateTopBarDate();

    document.querySelector(".top-bar-left").innerHTML = `
      <p>Sunrise</p>
      <p>${today.sunrise}</p>
    `;

    document.querySelector(".top-bar-right").innerHTML = `
      <p>Sunset</p>
      <p>${today.sunset}</p>
    `;

    document.querySelector(".top-bar-middle").innerHTML = `
      <p class="top-bar-temp">
        ${today.temp}ºC
        - Feels like ${today.feelslike}ºC
      </p>
      <p>${today.conditions} (*) ${today.precipprob}% Chance of precipitation</p>
      <p>
        UV level: ${today.uvindex} -
        ${data.address} - ${data.resolvedAddress}
      </p>
    `;
  }

  function updateTopBarDate(timezone) {
    timezone = timezone ? timezone : "";
    const currentDate = format(new Date(), "PPPP - HH:mm");

    document.querySelector(".top-bar-date").innerHTML = `
      <p>${currentDate} ${timezone}</p>
    `;
  }

  function displayError(err) {
    document.querySelector(".top-bar-middle").innerHTML = `
      <p class="top-bar-temp">Sorry, we couldn't get the data</p>
      <p>${err}</p>
    `;
  }

  Events.subscribe("page:loaded", updateThemeByTime);
  Events.subscribe("fetch:failed", displayError);

  return {
    updateTopBarDate,
    updateThemeByTime,
    updateTopBar,
  };
})();

export default Display;
