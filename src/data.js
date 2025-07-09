import { format, addDays } from "date-fns";

const Data = (() => {
  const data = fetchData("Brazilia");

  async function fetchData(location, date = undefined) {
    date = date ? new Date(date) : new Date();

    const fromDay = format(addDays(date, -1), "yyyy-MM-dd");
    const toDay = format(addDays(date, 7), "yyyy-MM-dd");

    // const response = await fetch(
    //   `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${fromDay}/${toDay}?unitGroup=metric&key=G2KQ9ZQTS2PMTS8KARLCAU5KS&contentType=json`,
    // );
    // const result = await response.json();
    //
    // return result;
    //
    return "aoijdso";
  }

  return {
    getData: () => {
      return data;
    },
  };
})();

export default Data;
