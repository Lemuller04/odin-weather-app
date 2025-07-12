import "./styles.css";

import Data from "./data.js";
import Display from "./display.js";
import Events from "./events.js";

const Index = (() => {
  let data;
  let intervals = {};

  document.addEventListener("DOMContentLoaded", () => {
    Events.publish("page:loaded");
  });

  function setData(fetchedData) {
    data = fetchedData;

    setupFlow();
  }

  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const location = document
      .querySelector("input[name=location]")
      .value.trim();

    if (location.length < 1) {
      alert("Invalid location");
      return;
    }

    clearInterval(intervals.updateTopBar);
    localStorage.setItem("location", JSON.stringify(location));

    Events.publish("location:searched", location);
  });

  function setupFlow() {
    Display.updateTopBarDate(data.timezone);
    Display.updateTopBar(data, data.currentConditions);
    intervals.updateTopBar = setInterval(
      Display.updateTopBarDate,
      1000,
      data.timezone,
    );
    setInterval(Display.updateThemeByTime);
  }

  Events.subscribe("data:fetched", setData);
})();
