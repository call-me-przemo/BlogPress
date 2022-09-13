const sun = document.querySelector("#sun");
const moon = document.querySelector("#moon");

function setTheme() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    sun.classList.remove("hidden");
    moon.classList.add("hidden");
  } else {
    document.documentElement.classList.remove("dark");
    sun.classList.add("hidden");
    moon.classList.remove("hidden");
  }
}

function setLightTheme() {
  localStorage.theme = "light";
  setTheme();
}

function setDarkTheme() {
  localStorage.theme = "dark";
  setTheme();
}
