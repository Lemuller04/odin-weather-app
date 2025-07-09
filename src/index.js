import "./styles.css";

import Data from "./data.js";
import Display from "./display.js";

const Index = (() => {
  console.log(Data.getData());

  document.addEventListener("DOMContentLoaded", () => {
    setInterval(Display.updateThemeByTime, 1000 * 60 * 60);

    Display.updateThemeByTime();
  });
})();
