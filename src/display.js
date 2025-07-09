const Display = (() => {
  function updateThemeByTime() {
    let hour = new Date().getHours();
    const root = document.documentElement;

    if (hour >= 6 && hour <= 18) {
      // Day mode
      root.style.setProperty("--bg-color", "#4f8ad1");
    } else {
      root.style.setProperty("--bg-color", "#141426");
    }
  }

  return {
    updateThemeByTime,
  };
})();

export default Display;
