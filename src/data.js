import { format, addDays } from "date-fns";
import Events from "./events.js";

const Data = (() => {
  let data;

  Events.subscribe("page:loaded", fetchData);

  async function fetchData(location, date = undefined) {
    date = date ? new Date(date) : new Date();

    if (JSON.parse(localStorage.getItem("location"))) {
      location = JSON.parse(localStorage.getItem("location"));
    }

    if (!location) {
      location = "Brazilia";
    }

    if (localStorage.length > 0) {
      const result = JSON.parse(localStorage.getItem("data"));

      if (
        result.address === location &&
        result.days[1].datetime === format(date, "yyyy-MM-dd")
      ) {
        Events.publish("data:fetched", result);
        console.log("Result from local storage");
        console.log(result);
        data = result;
        return;
      }
    }

    const fromDay = format(addDays(date, -1), "yyyy-MM-dd");
    const toDay = format(addDays(date, 7), "yyyy-MM-dd");

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${fromDay}/${toDay}?unitGroup=metric&key=G2KQ9ZQTS2PMTS8KARLCAU5KS&contentType=json`,
    );

    if (!response.ok) {
      let err = "";

      switch (response.status) {
        case 429:
          err = "429 (Too many requests), try again later.";
          break;
        default:
          err = response.status;
      }

      Events.publish("fetch:failed", err);
      return;
    }

    const result = await response.json();

    localStorage.setItem("data", JSON.stringify(result));
    Events.publish("data:fetched", result);
    console.log("Result from API");
    console.log(result);
    data = result;
    return;
  }

  Events.subscribe("location:searched", fetchData);
})();

export default Data;
